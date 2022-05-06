import './style/App.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function App() {
  const [movieForm, setMovieForm] = useState({
    name: '',
    description: '',
    image: ''
  })

  const handleChange = (e) => {
    setMovieForm({ ...movieForm, [e.target.name]: e.target.value })
    console.log(movieForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      `http://localhost:3001/api/movie/create`,
      movieForm
    )
    console.log(response.data)
  }

  return (
    <div className="App">
      <form className="create-movie" onSubmit={handleSubmit}>
        <div>
          <input
            name="name"
            type="text"
            placeholder="Movie Title"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="description"
            type="text"
            placeholder="Short Description"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="image"
            type="text"
            placeholder="Movie Poster"
            onChange={handleChange}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App
