import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Movie = (props) => {
  const { movieId } = useParams()

  useEffect(() => {
    props.getMovieDetails(movieId)
    props.movieDetails
      ? console.log(props.movieDetails[0], 'movie details')
      : console.log('not yet')
  }, [])

  return (
    <div className="movie-page">
      {props.movieDetails ? (
        <div className="movie-page-info">
          <div className="movie-page-info_image">
            <img src={props.movieDetails.image} alt="poster" />
          </div>
          <div className="movie-page-info_text">
            <h1>{props.movieDetails.name}</h1>
            <p>{props.movieDetails.description}</p>
          </div>
          <div className="cast-section">
            <h3>Cast</h3>
            <div>
              <input
                name="name"
                type="text"
                placeholder="Cast Member"
                onChange={props.handleCastChange}
              />
            </div>
            <button onClick={() => props.handleCastSubmit(movieId)}>Add</button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Movie
