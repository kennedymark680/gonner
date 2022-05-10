const MovieBanner = (props) => {
  return (
    <div className="movie-banner">
      <div className="movie-page-info_image" style={{backgroundImage: `url(${props.movieDetails.image})`}}>
        {/* <img src={props.movieDetails.image} alt="poster" /> */}
      </div>
      <div className="movie-page-info_text">
        <h1>{props.movieDetails.name}</h1>
        <p>{props.movieDetails.description}</p>
      </div>
    </div>
  )
}

export default MovieBanner