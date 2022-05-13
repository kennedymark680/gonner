import Leader from "./Leader"

const Scoreboard = ({sortedLeaders}) => {

  

  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      {sortedLeaders.map((list) => (
        <Leader key={list.id} list={list}/>
      )
      )}
    </div>
  )
}

export default Scoreboard