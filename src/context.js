import React, { useContext, useEffect, useReducer } from "react"

import { SET_STORIES, REMOVE_STORY, HANDLE_PAGE, HANDLE_SEARCH } from "./actions"
import reducer from "./reducer"

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?"

const initialState = {
  isLoading: true,
  hits: [],
  query: "react",
  page: 0,
  nbPages: 0
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // API CALL
  const fetchStories = async (url) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({ type: SET_STORIES, payload: { hits: data.hits, nbPages: data.nbPages } })
    } catch (error) {
      console.log(error)
    }
  }

  // DELETE STORY FROM UI
  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id })
  }

  // SEARCH BAR
  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query })
  }
  //PAGINATION
  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value })
  }

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
  }, [state.query, state.page])

  return <AppContext.Provider value={{ ...state, removeStory, handleSearch, handlePage }}>{children}</AppContext.Provider>
}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
