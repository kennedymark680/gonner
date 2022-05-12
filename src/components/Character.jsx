import { useState } from 'react'

const Character = (props) => {

  const [clickedGonner, toggleClickedGonner] = useState(false)
  const [clickedSurvivor, toggleClickedSurvivor] = useState(false)

  const gonnerClicked = () => {
    toggleClickedGonner(!clickedGonner)
  }

  const survivorClicked = () => {
    toggleClickedSurvivor(!clickedSurvivor)
  }

  return (
    <div className="character">
      <h4>{props.order}</h4>
      <h4>{props.name}</h4>
      <div className="character-buttons">
        <button onClick={!clickedSurvivor ? () => (props.handleGonner(props.id), gonnerClicked()) : null} className={ clickedGonner ? 'gonner-button' : null}>Gonner</button>
        <button onClick={!clickedGonner ? () => survivorClicked() : null} className={ clickedSurvivor ? 'survivor-button' : null}>Survivor</button>
      </div>
    </div>
  )
}

export default Character