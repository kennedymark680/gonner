import { useState } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'

const SearchMovie = (props) => {

  const API_KEY = 'dd80d4093c52a1f44c0690a18568bd3b'
  const DOMAIN = 'https://api.themoviedb.org/3'
  const IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/original' 

  const [formValue, setFormValue] = useState('')
  const [movies, setMovies] = useState([])
  const search = true

  const handleChange = (e) => {
    setFormValue(e.target.value)
  }

  const handleSubmit = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${formValue}&api_key=dd80d4093c52a1f44c0690a18568bd3b`
    )
    setMovies(res.data.results)
    setFormValue('')
    console.log(res.data.results)
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
        <MovieCard image={`${IMAGE_BASE_PATH}${movie.poster_path}`} search={search} movie={movie} 
        handleMovieSubmit={props.handleMovieSubmit}
        setMovieForm={props.setMovieForm}/>
        ))}
        </div>
    </div>
  )
}

export default SearchMovie