import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import HomeBanner from '../components/HomeBanner'
import AddMovie from '../components/AddMovie'
import AddMovieForm from '../components/AddMovieForm'
import LearnToPlay from '../components/LearnToPlay'
import SearchMovie from '../components/SearchMovie'

const Home = (props) => {
  const [hasMovie, setHasMovie] = useState(false)
  const [isInstructionsDisplayed, setIsInstructionsDisplayed] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    props.getAllMovies()
  }, [])

  return (
    <div className="homePage">
      <HomeBanner
        clickLearn={() => setIsInstructionsDisplayed(!isInstructionsDisplayed)}
      />
      <AddMovie
        clickAddMovie={() => setHasMovie(!hasMovie)}
        clickSearch={() => setHasSearched(!hasSearched)}
      />
      {hasSearched ? (
        <SearchMovie
          setMovieForm={props.setMovieForm}
          handleMovieSubmit={props.handleMovieSubmit}
        />
      ) : null}
      {isInstructionsDisplayed ? <LearnToPlay /> : null}
      {hasMovie ? (
        <AddMovieForm
          handleMovieSubmit={props.handleMovieSubmit}
          handleMovieChange={props.handleMovieChange}
        />
      ) : null}
      {!isInstructionsDisplayed && !hasSearched ? (
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
