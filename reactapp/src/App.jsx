import React from 'react'
import Search from './components/Search.jsx'
import { useState } from 'react'
import { useEffect } from 'react'

export const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(effect: () => {
    
  })

  return (
    <main>

      <div className='pattern' />
      <div className="wrapper">
        <header>
          <img src="./public/hero-img.png" alt="HeroBanner"></img>

          <h1>Find <span className='text_gradient'>Movies</span> You'll Love</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <h1 className="text-white">{searchTerm}</h1>


      </div>
    </main>
  )
}

export default App
