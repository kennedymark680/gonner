import { useState } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import { BASE_URL, POSTER_PATH } from '../globals'

const SearchMovie = (props) => {

  let API_KEY = process.env.REACT_APP_TMDB_KEY

  const [formValue, setFormValue] = useState('')
  const [movies, setMovies] = useState([])
  const search = true

  const handleChange = (e) => {
    setFormValue(e.target.value)
  }

  const handleSubmit = async () => {
    const res = await axios.get(
      `${BASE_URL}/search/movie?query=${formValue}&api_key=${API_KEY}`
    )
    setMovies(res.data.results)
    setFormValue('')
  }

  return (
    <div className='search-movie-section'>
      <div>
        <input 
          onChange={handleChange}
          name="movieSearch"
          placeholder='Search Title'
          value={formValue}
        ></input>
        <button onClick={() => handleSubmit()}>Find</button>
      </div>
      <div className='movie-list'>
      {movies.map((movie) => (
        <MovieCard key={movie.id} image={`${POSTER_PATH}${movie.poster_path}`} search={search} movie={movie} 
        handleMovieSubmit={props.handleMovieSubmit}
        setMovieForm={props.setMovieForm}/>
        ))}
        </div>
    </div>
  )
}

export default SearchMovie