const MovieCard = (props) => {
  return (
    <div className="movie-card" onClick={() => props.playMovie(props.id)} >
        <img className="movie-card-image" src={`${props.image}`}/>
      </div>
  )
}

export default MovieCard