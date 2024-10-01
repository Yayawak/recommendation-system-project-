import React from 'react'
import SearchResult from "./SearchResult"

import "../assets/styles/SearchResultsList.css"

const SearchResultsList = ({ results = [] }) => {
    // Check if results is an array
    if (!Array.isArray(results)) {
        return <p>No results</p>; // Optionally display a message if results is not valid
    }
    return (
        <div className='results-list'>
            {
                results.map((result, id) => {
                    return <SearchResult result={result} key={id} />
                })
            }
        </div>
    )
}

export default SearchResultsList
