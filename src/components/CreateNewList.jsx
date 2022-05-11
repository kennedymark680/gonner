const CreateNewList = (props) => {
  return (
    <div className="add-list-section">
        <div>
          <input name="name" onChange={props.handleGuessListChange} placeholder="New List Name"/>
          <button className="add-list" onClick={props.handleGuessListSubmit}>
              Add
          </button>
        </div>
    </div>
  )
}

export default CreateNewList