import Character from "./Character"
import axios from 'axios'
import { useState }  from 'react'

const GuessList = (props) => {
  const apiUrl = 'http://localhost:3001'

  const [character, setCharacter] = useState('')


  const handleCharacterChange = (e) => {
    setCharacter(e.target.value)
    console.log(character)
  }

  const handleCharacterCreate = async () => {
    const res = await axios.post(`${apiUrl}/api/character/`)
    console.log(character)
    setCharacter('')
  }

  const handleGonner = async (charId) => {
    console.log(charId)
    // const resCharacter = await axios.put(`${apiUrl}/api/character${charId}`)
  }

 

  return (
    <div className="guessList">
      <div>Guess List</div>
      <input list='characters' name='characterSelection' onChange={handleCharacterChange} value={character}/>
      <datalist id='characters'>
        {props.movieCast.map((char) => (
          <option value={char.name} key={char.id}/>
        ))}
      </datalist>
      <button onClick={handleCharacterCreate}>Create</button>
      <div className="characterList">
        {props.movieCast.map((char) => (
          <Character key={char.id} name={char.name} id={char.id} gonnerOrder={char.order} handleGonner={handleGonner}/>
        ))}
      </div>
    </div>
  )
}

export default GuessList