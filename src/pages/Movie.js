import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import GuessList from '../components/GuessList'

const Movie = (props) => {
  const { movieId } = useParams()
  const apiUrl = 'http://localhost:3001'

  const handleCastSubmit = async () => {
    const res = await axios.post(
      `${apiUrl}/api/castmember/${movieId}`,
      props.castForm
    )
    props.setCastForm({
      name: '',
      alive: true,
      order: 0
    })
    props.getCastByMovieId(movieId)
  }

  const handleDeath = async (castmemberId) => {
    props.getMovieDetails(movieId)
    console.log(props.movieDetails.gonnerOrder, 'handle death')

    const resCastMember = await axios.put(
      `${apiUrl}/api/castmember/${castmemberId}`,
      {
        alive: false,
        order: props.movieDetails.gonnerOrder
      }
    )

    const newOrder = props.movieDetails.gonnerOrder + 1
    const resMovie = await axios.put(`${apiUrl}/api/movie/${movieId}`, {
      gonnerOrder: newOrder
    })
    console.log(resMovie.data, 'updated order')
    props.getMovieDetails(movieId)
    console.log(props.movieDetails.gonnerOrder, 'call again')

    props.getCastByMovieId(movieId)
  }

  useEffect(() => {
    props.getMovieDetails(movieId)
    props.getCastByMovieId(movieId)
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
            <h2>Cast</h2>
            {props.movieCast.map((char) => (
              <div key={char.id}>
                <h4>
                  {char.name}
                  <button onClick={() => handleDeath(char.id)}>X</button>
                  <button
                    onClick={() => props.deleteCastMember(char.id, movieId)}
                  >
                    Delete
                  </button>
                  <p>{char.order}</p>
                </h4>
              </div>
            ))}
            <div>
              <input
                name="name"
                type="text"
                placeholder="Cast Member"
                value={props.castForm.name}
                onChange={props.handleCastChange}
              />
            </div>
            <button onClick={() => handleCastSubmit(movieId)}>Add</button>
            <button onClick={() => console.log()}>Increase</button>
          </div>
          <div>
            <GuessList movieCast={props.movieCast} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Movie