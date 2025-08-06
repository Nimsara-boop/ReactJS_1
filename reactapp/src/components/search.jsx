import React from 'react'

const search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
      <div> <img src="search.svg" alt='search'/></div>

      <input type = "text" placeholder="Search through tousands of movies" value={searchTerm} onChange={(e)=>  setSearchTerm(e.target.value)}/>
    </div>
  )
}

export default search