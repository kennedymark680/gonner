const Character = (props) => {
  return (
    <div className="character">
      <h4>{props.order}</h4>
      <h4>{props.name}</h4>
      <div className="cast-buttons">
        <button onClick={() => props.handleGonner(props.id)}>Gonner</button>
      </div>
    </div>
  )
}

export default Character