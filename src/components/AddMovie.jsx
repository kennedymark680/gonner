
const AddMovie = ({clickAddMovie, clickSearch}) => {
  return (
    <div className="add-movie-section">
      <button onClick={clickAddMovie} className="white-red-button">Add Movie</button>
      <button onClick={clickSearch}  className="white-red-button">Search</button>
    </div>
  )
}

export default AddMovie