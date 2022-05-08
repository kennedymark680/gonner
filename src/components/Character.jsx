const Character = (props) => {
  return (
    <div className="character">
      <div>{props.name}</div>
      <div>{props.order}</div>
      <button onClick={() => props.handleGonner(props.id)}>Gonner</button>
    </div>
  )
}

export default Character