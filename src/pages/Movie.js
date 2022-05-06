import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Movie = (props) => {
  const { movieId } = useParams()

  useEffect(() => {
    props.getMovieDetails(movieId)
  }, [])

  return <div className="movie-page"></div>
}

export default Movie
