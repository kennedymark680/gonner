import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import HomeBanner from '../components/HomeBanner'
import AddMovie from '../components/AddMovie'
import AddMovieForm from '../components/AddMovieForm'
import LearnToPlay from '../components/LearnToPlay'
import SearchMovie from '../components/SearchMovie'

const Home = (props) => {
  const [addMovie, toggleAddMovie] = useState(false)
  const [learnToPlay, toggleLearnToPlay] = useState(false)
  const [search, toggleSearch] = useState(false)

  const clickLearn = () => {
    toggleLearnToPlay(!learnToPlay)
  }

  const clickAddMovie = () => {
    toggleAddMovie(!addMovie)
  }

  const clickSearch = () => {
    toggleSearch(!search)
  }

  useEffect(() => {
    props.getAllMovies()
  }, [])

  return (
    <div className="homePage">
      <HomeBanner clickLearn={clickLearn} />
      <AddMovie clickAddMovie={clickAddMovie} clickSearch={clickSearch} />
      {search ? (
        <SearchMovie
          setMovieForm={props.setMovieForm}
          handleMovieSubmit={props.handleMovieSubmit}
        />
      ) : null}
      {learnToPlay ? <LearnToPlay /> : null}
      {addMovie ? (
        <AddMovieForm
          handleMovieSubmit={props.handleMovieSubmit}
          handleMovieChange={props.handleMovieChange}
        />
      ) : null}
      {!learnToPlay && !search ? (
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
      ) : null}
      <footer></footer>
    </div>
  )
}

export default Home
