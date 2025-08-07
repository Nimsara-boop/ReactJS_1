import React from 'react'
import Search from './components/Search.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import Spinner from './components/spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { useDebounce } from 'react-use'

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json', //API will send back a JSON, a Javacript Object
    Authorization: `Bearer ${API_KEY}`//verify who is trying to make the request. in this case, i made an account in TMDB
  }
};


export const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');


  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage('');
    try{
      const endpoint = query ?
                       `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`  //encodeURIComponent is used to encode the query string to be URL safe
                       :
                      `${API_BASE_URL}?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === 'False"'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);



    }


    catch (error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Fail to fetch movies. Please try again later.');
    }

    finally{
      setIsLoading(false);
      console.log(isLoading.valueOf());
    }
    }
  



  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>

      <div className='pattern' />
      <div className="wrapper">
        <header>
          <img src="./public/hero-img.png" alt="HeroBanner"></img>

          <h1>Find <span className='text_gradient'>Trending Movies</span> <p>That You'll Love</p></h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <h1 className="text-white">{searchTerm}</h1>

        </header>

        <section className="all-movies">
          <h2 className="mt-[40px]">All movies</h2>

          {/* if-else statements dont work in JSX, must use ternary*/}

         {isLoading ? (
            <p className="text-white"><Spinner /></p>)  : errorMessage? (
            <p className='text-red-500'>{errorMessage}</p>)  : (

                        
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              )
                
            )

            }
            </ul>

            )}
          

        
         
        </section>


      </div>
    </main>
  )
}

export default App