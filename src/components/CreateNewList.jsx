const CreateNewList = (props) => {
  return (
    <div className="add-list-section">
      <h2>Create New List</h2>
        <div>
          <input name="name" onChange={props.handleGuessListChange} placeholder="List Name"/>
          <button className="add-list" onClick={props.handleGuessListSubmit}>
              Add
          </button>
        </div>
    </div>
  )
}

export default CreateNewList