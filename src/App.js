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
  const [movieCast, setMovieCast] = useState([])
  const [castForm, setCastForm] = useState({
    name: '',
    alive: true,
    order: 0
  })
  const [movieForm, setMovieForm] = useState({
    name: '',
    description: '',
    image: '',
    gonnerOrder: 1
  })

  // ------ HANDLE CHANGES --------

  const handleMovieChange = (e) => {
    setMovieForm({ ...movieForm, [e.target.name]: e.target.value })
    console.log(movieForm)
  }

  const handleCastChange = (e) => {
    setCastForm({ ...castForm, [e.target.name]: e.target.value })
  }

  // ------- HANDLE SUBMITs ---------

  const handleMovieSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post(`${apiUrl}/api/movie/create`, movieForm)
    console.log(res.data)
  }

  // -------- GET REQUESTS ----------

  const getMovieDetails = async (movieId) => {
    const res = await axios.get(`${apiUrl}/api/movie/${movieId}`)
    setMovieDetails(res.data)
  }

  const getAllMovies = async () => {
    const res = await axios.get(`${apiUrl}/api/movie`)
    setAllMovies(res.data)
    console.log(allMovies)
  }

  const getCastByMovieId = async (movieId) => {
    const res = await axios.get(`${apiUrl}/api/castmember/${movieId}`)
    setMovieCast(res.data)
  }

  // ---------- DELETES ------------

  const deleteCastMember = async (castmemberId, movieId) => {
    const res = await axios.delete(`${apiUrl}/api/castmember/${castmemberId}`)
    getCastByMovieId(movieId)
    getMovieDetails(movieId)

    let newOrder = movieDetails.gonnerOrder - 1
    console.log(movieDetails.gonnerOrder, 'gonnerOrder')
    console.log(newOrder, 'newOrder')
    const resMovie = await axios.put(`${apiUrl}/api/movie/${movieId}`, {
      gonnerOrder: newOrder
    })
    getMovieDetails(movieId)
    console.log(movieDetails, 'after delete and update')
  }

  // --------- NAVIGATE ---------------

  const playMovie = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  // --------- OTHER FUNCTIONS -------

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
              getCastByMovieId={getCastByMovieId}
              deleteCastMember={deleteCastMember}
              movieCast={movieCast}
              castForm={castForm}
              setCastForm={setCastForm}
              // gonnerOrder={gonnerOrder}
              // increaseGonnerCount={increaseGonnerCount}
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
