import { useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import HomeBanner from '../components/HomeBanner'

const Home = (props) => {
  useEffect(() => {
    props.getAllMovies()
  }, [])

  return (
    <div className="homePage">
      <HomeBanner />
      <div className="movie-list">
        {props.allMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            name={movie.name}
            description={movie.description}
            image={movie.image}
            playMovie={props.playMovie}
          />
        ))}
      </div>
      <div className="movie-card create">
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
          <button id="create-movie-button">Create Movie</button>
        </form>
      </div>
    </div>
  )
}

export default Home
