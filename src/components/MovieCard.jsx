import { useNavigate } from 'react-router-dom'

const MovieCard = (props) => {

  let navigate = useNavigate()

  const playOrCreate = () => {
    if (props.search) {
      props.setMovieForm({
        name: `${props.movie.title}`,
        description: '',
        image: `${props.image}`,
        gonnerOrder: 1
      })
      props.handleMovieSubmit()
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