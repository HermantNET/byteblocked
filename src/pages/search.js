import React from 'react'

const Search = () => (
  <div>
    <h1>Results for {window.location.search.substring(2)}</h1>
    <p>No results found.</p>
  </div>
)

export default Search
