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
    // const res = await axios.post(`${apiUrl}/api/`)
    console.log(character)
    setCharacter('')
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
    </div>
  )
}

export default GuessList