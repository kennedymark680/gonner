const Leader = ({list}) => {
  return (
    <div className="leader">
      <div><h4>{list.score}</h4></div>
      <div><h4>{list.name}</h4></div>
    </div>
  )
}

export default Leader