const AddMovieForm = (props) => {
  return (
    <div className="add-movie-form">
        <form className="create-movie" onSubmit={props.handleMovieSubmit}>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Movie Title"
              onChange={props.handleMovieChange}
            />
          </div>
          <div>
            <input
              name="description"
              type="text"
              placeholder="Short Description"
              onChange={props.handleMovieChange}
            />
          </div>
          <div>
            <input
              name="image"
              type="text"
              placeholder="Movie Poster URL"
              onChange={props.handleMovieChange}
            />
          </div>
          <button className="white-red-button" onSubmit={() => props.handleMovieSubmit()}>Create</button>
        </form>
      </div>
  )
}

export default AddMovieForm