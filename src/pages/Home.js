import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import HomeBanner from '../components/HomeBanner'
import AddMovie from '../components/AddMovie'
import AddMovieForm from '../components/AddMovieForm'

const Home = (props) => {
  const [addMovie, toggleAddMovie] = useState(false)

  const clickAddMovie = () => {
    toggleAddMovie(!addMovie)
  }

  useEffect(() => {
    props.getAllMovies()
  }, [])

  return (
    <div className="homePage">
      <HomeBanner />
      <AddMovie clickAddMovie={clickAddMovie} />
      {addMovie ? (
        <AddMovieForm
          handleMovieSubmit={props.handleMovieSubmit}
          handleMovieChange={props.handleMovieChange}
        />
      ) : null}
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
      <footer></footer>
    </div>
  )
}

export default Home
