import React from "react"
import { useGlobalContext } from "./context"

const Buttons = () => {
  const { isLoading, handlePage, nbPages, page } = useGlobalContext()
  // console.log(handlePage);
  return (
    <div className="btn-container">
      <button disabled={isLoading} onClick={() => handlePage("dec")}>
        prev page
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage("inc")}>
        next page
      </button>
    </div>
  )
}

export default Buttons
