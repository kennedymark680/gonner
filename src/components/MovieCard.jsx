import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { BACKEND } from '../globals'

const MovieCard = (props) => {

  let navigate = useNavigate()



  const [selectedSearch, setSelectedSearch] = useState({})

  const selectedSearchCreate = async () => {
    const res = await axios.post(`${BACKEND}/api/movie/create`, {
      name: `${props.movie.title}`,
      description: `${props.movie.overview.split('. ', 1)[0]}`,
      image: `${props.image}`,
      gonnerOrder: 1
    })
    navigate(`/movie/${res.data.id}`)
  }


  const playOrCreate = () => {
    if (props.search && selectedSearch) {
      selectedSearchCreate()
    } else {
      props.playMovie(props.id)
    }
  }


  return (
    <div className="movie-card" onClick={() => playOrCreate()} >
        <img className="movie-card-image" src={`${props.image}`}/>
      </div>
  )
}

export default MovieCard