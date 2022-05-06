import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Movie = (props) => {
  const { movieId } = useParams()

  useEffect(() => {
    props.getMovieDetails(movieId)
  }, [])

  return (
    <div className="movie-page">
      <div className="movie-info-section">
        <img src="" alt="" />
        <div className="movie-info-text">
          <h1>Title</h1>
          <p>Description</p>
        </div>
      </div>
    </div>
  )
}

export default Movie
