const MovieBanner = (props) => {
  return (
    <div className="movie-banner">
      <div className="movie-image-wrapper">
        <img className="movie-page-info_image" src={props.movieDetails.image} alt='poster' />
      </div>
      <div>
        <div className="movie-page-info_text">
          <h1>{props.movieDetails.name}</h1>
          <p>{props.movieDetails.description}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieBanner