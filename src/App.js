import './style/App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import axios from 'axios'
import Movie from './pages/Movie'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'

function App() {
  let navigate = useNavigate()

  const apiUrl = 'http://localhost:3001'

  // ------- STATE LIVE HERE -----------

  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
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

  // ------- AUTH FUNCTIONS --------

  const handleLogout = () => {
    setUser(null) //Once logged out, the user no longer has pilgrim priviledges
    toggleAuthenticated(false) // Once logged out, the user is no longer authenticated
    localStorage.clear()
  }
  // Check each time if the user is a pilgrim and authenticated to make certain commands
  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  // ------ HANDLE CHANGES --------

  const handleMovieChange = (e) => {
    setMovieForm({ ...movieForm, [e.target.name]: e.target.value })
  }

  const handleCastChange = (e) => {
    setCastForm({ ...castForm, [e.target.name]: e.target.value })
  }

  // ------- HANDLE SUBMITs ---------

  const handleMovieSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post(`${apiUrl}/api/movie/create`, movieForm)
    getAllMovies()
  }

  // -------- GET REQUESTS ----------

  const getMovieDetails = async (movieId) => {
    const res = await axios.get(`${apiUrl}/api/movie/${movieId}`)
    setMovieDetails(res.data)
  }

  const getAllMovies = async () => {
    const res = await axios.get(`${apiUrl}/api/movie`)
    setAllMovies(res.data)
  }

  const getCastByMovieId = async (movieId) => {
    axios.get(`${apiUrl}/api/castmember/${movieId}`).then((res) => {
      setMovieCast(res.data)
    })
  }

  // ---------- DELETES ------------

  const deleteCastMember = async (castmemberId, movieId) => {
    const res = await axios.delete(`${apiUrl}/api/castmember/${castmemberId}`)
    getCastByMovieId(movieId)
    getMovieDetails(movieId)

    if (movieDetails.gonnerOrder > 1) {
      let newOrder = movieDetails.gonnerOrder - 1
      const resMovie = await axios.put(`${apiUrl}/api/movie/${movieId}`, {
        gonnerOrder: newOrder
      })
      getMovieDetails(movieId)
    }
  }

  // --------- NAVIGATE ---------------

  const playMovie = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  // --------- USE EFFECT ------------

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  // --------- OTHER FUNCTIONS -------

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/movie/:movieId"
          element={
            <Movie
              user={user}
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
          path="/login"
          element={
            <Login
              setUser={setUser}
              toggleAuthenticated={toggleAuthenticated}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
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
