const MovieCard = (props) => {
  return (
    <div className="movie-card">
        <div className="movie-card-image" onClick={() => props.playMovie(props.id)} style={{backgroundImage: `url(${props.image})`}}>
          {/* <img src={props.image} alt='poster' /> */}
        </div>
        {/* <div className="movie-card-text">
          <h1>{props.name}</h1>
          <div>{props.description}</div>
          <button onClick={() => props.playMovie(props.id)}>Play!</button>
        </div> */}
      </div>
  )
}

export default MovieCard