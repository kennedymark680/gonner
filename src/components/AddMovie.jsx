const AddMovie = ({clickAddMovie, clickSearch}) => {
  return (
    <div className="add-movie-section">
      <button onClick={() => clickAddMovie()}>Add Movie</button>
      <button onClick={() => clickSearch()}>Search</button>
    </div>
  )
}

export default AddMovie