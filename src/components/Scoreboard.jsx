import Leader from "./Leader"

const Scoreboard = ({allGuessLists}) => {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      {allGuessLists.map((list) => (
        <Leader list={list}/>
      )
      )}
    </div>
  )
}

export default Scoreboard