import './style/App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Movie from './pages/Movie'
import Home from './pages/Home'

function App() {
  let navigate = useNavigate()

  const apiUrl = 'http://localhost:3001'

  // ------- STATE LIVE HERE -----------

  const [allMovies, setAllMovies] = useState([])
  const [movieDetails, setMovieDetails] = useState({})
  const [castForm, setCastForm] = useState({
    name: '',
    alive: true,
    order: null,
    movieId: null
  })
  const [movieForm, setMovieForm] = useState({
    name: '',
    description: '',
    image: ''
  })

  // ------ HANDLE CHANGES --------

  const handleMovieChange = (e) => {
    setMovieForm({ ...movieForm, [e.target.name]: e.target.value })
    console.log(movieForm)
  }

  const handleCastChange = (e) => {
    setCastForm({ ...castForm, [e.target.name]: e.target.value })
    console.log(castForm)
  }

  // ------- HANDLE SUBMITs ---------

  const handleMovieSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post(`${apiUrl}/api/movie/create`, movieForm)
    console.log(res.data)
  }

  const handleCastSubmit = async (e, movieId) => {
    console.log(castForm, 'handle submit')
    const res = await axios.post(
      `${apiUrl}/api/castmember/${movieId}`,
      castForm
    )
    console.log(res.data)
  }

  // -------- GET REQUESTS ----------

  const getMovieDetails = async (movieId) => {
    const res = await axios.get(`${apiUrl}/api/movie/${movieId}`)
    setMovieDetails(res.data)
    console.log(movieDetails)
  }

  const getAllMovies = async () => {
    const res = await axios.get(`${apiUrl}/api/movie`)
    setAllMovies(res.data)
    console.log(allMovies)
  }

  // --------- NAVIGATE ---------------

  const playMovie = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/movie/:movieId"
          element={
            <Movie
              getMovieDetails={getMovieDetails}
              movieDetails={movieDetails}
              handleCastChange={handleCastChange}
              handleCastSubmit={handleCastSubmit}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              getAllMovies={getAllMovies}
              allMovies={allMovies}
              handleMovieSubmit={handleMovieSubmit}
              handleMovieChange={handleMovieChange}
              playMovie={playMovie}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
