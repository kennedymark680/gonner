import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const MovieCard = (props) => {

  let navigate = useNavigate()

  const apiUrl = 'https://gonner-backend.herokuapp.com'

  // let overview = props.movie.overview
  // let firstSentence = overview.split('. ', 1)[0]
  //${props.movie.overview.split('. ', 1)[0]}

  const [selectedSearch, setSelectedSearch] = useState({})

  const selectedSearchCreate = async () => {
    console.log(selectedSearch, 'selectedSearch')
    const res = await axios.post(`${apiUrl}/api/movie/create`, {
      name: `${props.movie.title}`,
      description: `${props.movie.overview.split('. ', 1)[0]}`,
      image: `${props.image}`,
      gonnerOrder: 1
    })
    console.log(res.data, 'res.data')
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