import { useState } from 'react'

const Cast = ({char, handleDeath, deleteCastMember, movieId, handleLived, allGuessLists, handleDeathReverse, handleLivedReverse, isDeathLoading}) => {
  
  const [clickedGonner, toggleClickedGonner] = useState(false)
  const [clickedSurvivor, toggleClickedSurvivor] = useState(false)



  const allowHandleDeath = () => {
    if (!clickedSurvivor) {
      toggleClickedGonner(!clickedGonner)
      if (!clickedGonner) {
        handleDeath(char.id)
      } else {
        handleDeathReverse(char)
      }
    }
  }

  const allowHandleLive = () => {
    if (!clickedGonner) {
      toggleClickedSurvivor(!clickedSurvivor)
      if (!clickedSurvivor) {
        handleLived(char, movieId)
      } else {
        handleLivedReverse(char, movieId)
      }
    }
  }

  
  return (
    <div className="cast">
      <h4>{char.order}</h4>
      <h4>{char.name}</h4>
      <div className="cast-button-container">
        <div className="cast-buttons">
          <button onClick={allowHandleDeath} className={ clickedGonner ? 'gonner-button' : null} disabled={isDeathLoading}>Died</button>
          <button onClick={allowHandleLive} className={ clickedSurvivor ? 'survivor-button' : null}>Lived</button>
        </div>
          <button id='delete' onClick={() => deleteCastMember(char.id, movieId)}>x</button>
        </div>
    </div>
  )
}

export default Cast