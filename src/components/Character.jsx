import { useState } from 'react'

const Character = (props) => {

  const [clickedGonner, toggleClickedGonner] = useState(false)
  const [clickedSurvivor, toggleClickedSurvivor] = useState(false)

  const gonnerClicked = () => {
    toggleClickedGonner(!clickedGonner)
  }

  const survivorClicked = () => {
    toggleClickedSurvivor(!clickedGonner)
  }

  return (
    <div className="character">
      <h4>{props.order}</h4>
      <h4>{props.name}</h4>
      <div className="character-buttons">

        <button onClick={() => (props.handleGonner(props.id), gonnerClicked())} className={ clickedGonner ? 'gonner-button' : null}>Gonner</button>
        <button onClick={() => (survivorClicked())} className={ clickedSurvivor ? 'survivor-button' : null}>Survivor</button>
      </div>
    </div>
  )
}

export default Character