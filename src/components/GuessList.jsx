import Character from "./Character"
import axios from 'axios'
import { useState, useEffect }  from 'react'

const GuessList = (props) => {
  const apiUrl = 'http://localhost:3001'

  // might not need this anymore 
  const [character, setCharacter] = useState('')

  const [characters, setCharacters] = useState([])



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
    const resCharacter = await axios.put(`${apiUrl}/api/character/${charId}`, { order: props.gonnerOrder})
    
    let newGonnerOrder = props.gonnerOrder + 1
    const resGuessList = await axios.put(`${apiUrl}/api/guesslist/${props.id}`, { gonnerOrder: newGonnerOrder})
    getCharactersByListId()
  }

  const getCharactersByListId = async () => {
    const characters = await axios.get(`${apiUrl}/api/character/${props.id}`)
    props.getAllGuessLists()
    setCharacters(characters.data)
  }
 
  useEffect(() => {
    getCharactersByListId()
  }, [])

  return (
    <div className="guessList">
      {/* <div>Guess List</div>
      <input list='characters' name='characterSelection' onChange={handleCharacterChange} value={character}/>
      <datalist id='characters'>
        {props.movieCast.map((char) => (
          <option value={char.name} key={char.id}/>
        ))}
      </datalist> */}
      <button onClick={getCharactersByListId}>get characters</button>
      <button onClick={handleCharacterCreate}>Create</button>
      <div className="characterList">
        <h3>{props.name}</h3>
        <h3>{props.score}</h3>
        <button onClick={() => props.checkScore(props.movieCast, characters, props.id)}>Check Score</button>
        {characters.map((char) => (
          <div>
            <Character key={char.id} name={char.name} id={char.id} order={char.order} handleGonner={handleGonner}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GuessList