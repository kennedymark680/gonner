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
    const resCharacter = await axios.put(`${apiUrl}/api/character/${charId}`, { order: props.gonnerOrder, alive: false})
    
    let newGonnerOrder = props.gonnerOrder + 1
    const resGuessList = await axios.put(`${apiUrl}/api/guesslist/${props.id}`, { gonnerOrder: newGonnerOrder})

    getCharactersByListId()
  }

  const getCharactersByListId = async () => {
    const characters = await axios.get(`${apiUrl}/api/character/${props.id}`)
    props.getAllGuessLists()
    setCharacters(characters.data)
  }

  const deleteList = async () => {
    const list = await axios.delete(`${apiUrl}/api/guesslist/delete/${props.id}`)
    props.getAllGuessLists()
  }
 
  useEffect(() => {
    getCharactersByListId()

    const interval = setInterval(() => {
      getCharactersByListId()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="guessList">
        <h2>{props.name}</h2>
        <h3>Score: {props.score}</h3>
        {characters.map((char) => (
          <div>
            <Character key={char.id} name={char.name} id={char.id} order={char.order} handleGonner={handleGonner}/>
          </div>
        ))}
        <button className='remove-list' onClick={() => deleteList()}>Remove List</button>
      </div>
  )
}

export default GuessList