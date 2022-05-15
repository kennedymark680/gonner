import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import HomeBanner from '../components/HomeBanner'
import AddMovie from '../components/AddMovie'
import AddMovieForm from '../components/AddMovieForm'
import LearnToPlay from '../components/LearnToPlay'
import SearchMovie from '../components/SearchMovie'
import axios from 'axios'

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

  const findMovie = async () => {
    const res = await axios.get(
      'https://api.themoviedb.org/3/search/movie?query=${jaws}&api_key=dd80d4093c52a1f44c0690a18568bd3b'
    )
    console.log(res.data.results)
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
