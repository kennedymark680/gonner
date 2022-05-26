import Character from "./Character"
import axios from 'axios'
import { useState, useEffect }  from 'react'
import { BACKEND } from '../globals'

const GuessList = (props) => {

  const [characters, setCharacters] = useState([])


  const handleGonner = async (charId) => {
    await axios.put(`${BACKEND}/api/character/${charId}`, { order: props.gonnerOrder, alive: false})
    
    let newGonnerOrder = props.gonnerOrder + 1
    await axios.put(`${BACKEND}/api/guesslist/${props.id}`, { gonnerOrder: newGonnerOrder})
    getCharactersByListId()
  }

  const handleGonnerReverse = async (char) => {
    let newGonnerOrder = props.gonnerOrder - 1
    await axios.put(`${BACKEND}/api/guesslist/${props.id}`, { gonnerOrder: newGonnerOrder})
    await axios.put(`${BACKEND}/api/character/${char.id}`, { order: null, alive: true})
    getCharactersByListId()
  }

  const getCharactersByListId = async () => {
    const characters = await axios.get(`${BACKEND}/api/character/${props.id}`)
    props.getAllGuessLists()
    setCharacters(characters.data)
  }

  const deleteList = async () => {
    await axios.delete(`${BACKEND}/api/guesslist/delete/${props.id}`)
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
          <div key={char.id}>
            <Character name={char.name} id={char.id} order={char.order} char={char} handleGonner={handleGonner} handleGonnerReverse={handleGonnerReverse}/>
          </div>
        ))}
        <button className='remove-list' onClick={() => deleteList()}>Remove List</button>
      </div>
  )
}

export default GuessList