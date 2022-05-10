const Cast = ({char, handleDeath, deleteCastMember, movieId}) => {
  return (
    <div className="cast">
      <h4>{char.order}</h4>
      <h4>{char.name}</h4>
      <div className="cast-buttons">
        <button onClick={() => handleDeath(char.id)}>Died</button>
        <button onClick={() => deleteCastMember(char.id, movieId)}>Delete</button>
      </div>
    </div>
  )
}

export default Cast