import { useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  let navigate = useNavigate()

  useEffect(() => {
    props.getAllMovies()
  }, [])

  const playMovie = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  return (
    <div>
      <form className="create-movie" onSubmit={props.handleMovieSubmit}>
        <div>
          <input
            name="name"
            type="text"
            placeholder="Movie Title"
            onChange={props.handleMovieChange}
          />
        </div>
        <div>
          <input
            name="description"
            type="text"
            placeholder="Short Description"
            onChange={props.handleMovieChange}
          />
        </div>
        <div>
          <input
            name="image"
            type="text"
            placeholder="Movie Poster"
            onChange={props.handleMovieChange}
          />
        </div>
        <button>Submit</button>
      </form>
      <div className="movie-list">
        {props.allMovies.map((movie) => (
          <MovieCard
            name={movie.name}
            description={movie.description}
            image={movie.image}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
