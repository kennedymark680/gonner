const AddMovie = ({clickAddMovie}) => {
  return (
    <div className="add-movie-section">
      <button onClick={() => clickAddMovie()}>Add a Movie</button>
    </div>
  )
}

export default AddMovie