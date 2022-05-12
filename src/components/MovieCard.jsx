const MovieCard = (props) => {
  return (
    <div className="movie-card" onClick={() => props.playMovie(props.id)} >
        <div className="movie-card-image"style={{backgroundImage: `url(${props.image})`}}>
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