import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import GuessList from '../components/GuessList'
import Cast from '../components/Cast'
import CreateNewList from '../components/CreateNewList'

const Movie = (props) => {
  // -------- VARIABLES --------------

  const { movieId } = useParams()
  const apiUrl = 'http://localhost:3001'

  // ----------- STATE -----------------

  const [characterList, setCharacterList] = useState([])
  const [allGuessLists, setAllGuessLists] = useState([])
  const [guessListName, setGuessListName] = useState({
    name: props.user ? `${props.user.username}` : '',
    score: 0,
    gonnerOrder: 1
  })

  // ----------- AXIOS CALLS -------------

  const handleCastSubmit = async () => {
    const res = await axios.post(
      `${apiUrl}/api/castmember/${movieId}`,
      props.castForm
    )
    props.setCastForm({
      name: '',
      alive: true,
      order: 0
    })
    props.getCastByMovieId(movieId)
  }

  const updateScore = async (selectedCast, allGuessLists) => {
    // allGuessLists.forEach(async (list) => {
    for (const list of allGuessLists) {
      const foundChar = list.Characters.filter(
        (char) => selectedCast.name === char.name
      )
      const difference = Math.abs(selectedCast.order - foundChar[0].order)
      let score = 0
      if (difference === 0) {
        score = 3
      } else if (difference === 1) {
        score = 1
      }
      const newGuessList = await axios.put(
        `${apiUrl}/api/guesslist/score/${list.id}`,
        {
          score: score
        }
      )
    }
    getAllGuessLists()
  }

  const handleDeath = async (castmemberId) => {
    // Check if gonnerOrder isn't more than the number of cast members
    if (props.movieDetails.gonnerOrder <= props.movieCast.length) {
      // Set Cast Members gonner order
      const resCastMember = await axios.put(
        `${apiUrl}/api/castmember/${castmemberId}`,
        {
          alive: false,
          order: props.movieDetails.gonnerOrder
        }
      )
      let selectedCast = resCastMember.data[0]

      updateScore(selectedCast, allGuessLists)

      // Increment and set the new movies gonner order
      const newOrder = props.movieDetails.gonnerOrder + 1
      const resMovie = await axios.put(`${apiUrl}/api/movie/${movieId}`, {
        gonnerOrder: newOrder
      })
      props.getCastByMovieId(movieId)
    }
  }

  // ----- GUESS LIST -----
  const handleGuessListChange = (e) => {
    setGuessListName({ ...guessListName, [e.target.name]: e.target.value })
  }

  const handleGuessListSubmit = async (e) => {
    e.preventDefault()
    // creating the GUESS LIST
    const res = await axios.post(
      `${apiUrl}/api/guesslist/${movieId}`,
      guessListName
    )

    // creating each CHARACTER for the list
    for (let i = 0; i < props.movieCast.length; i++) {
      let character = {
        name: props.movieCast[i].name,
        order: 0,
        alive: true
      }
      createCharacters(res.data.id, character)
    }
    getAllGuessLists()
  }

  const getAllGuessLists = async () => {
    const res = await axios.get(`${apiUrl}/api/guesslist/${movieId}`)
    setAllGuessLists(res.data)
  }

  const createCharacters = async (guesslistId, character) => {
    let charRes = await axios.post(
      `${apiUrl}/api/character/${guesslistId}`,
      character
    )
  }

  // ------- CHECKING SCORE ---------
  const checkScore = async (cast, guessList, guessListId) => {
    // Set the score to zero first
    let newScore = 0

    cast.forEach((char, index) => {
      // console.log(char.name, 'char.name', index)
      // console.log(guessList[index].name, 'guessList[index].name', index)
      if (char.name === guessList[index].name) {
        newScore += 3
      } else if (
        index < cast.length &&
        char.name === guessList[index + 1].name
      ) {
        newScore += 1
      } else if (index > 0 && char.name === guessList[index - 1].name) {
        newScore += 1
      } else {
        newScore += 0
      }
    })

    const res = await axios.put(
      `${apiUrl}/api/guesslist/score/${guessListId}`,
      {
        score: newScore
      }
    )
    getAllGuessLists()
  }

  useEffect(() => {
    props.getMovieDetails(movieId)
    props.getCastByMovieId(movieId)
    getAllGuessLists()

    const interval = setInterval(() => {
      getAllGuessLists()
      props.getMovieDetails(movieId)
      props.getCastByMovieId(movieId)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="movie-page">
      {props.movieDetails ? (
        <div className="movie-page-info">
          <div className="movie-page-info_image">
            <img src={props.movieDetails.image} alt="poster" />
          </div>
          <div className="movie-page-info_text">
            <h1>{props.movieDetails.name}</h1>
            <p>{props.movieDetails.description}</p>
          </div>
          <div className="cast-section">
            <h2>Cast</h2>
            {props.movieCast.map((char) => (
              <Cast
                key={char.id}
                char={char}
                handleDeath={handleDeath}
                deleteCastMember={props.deleteCastMember}
                movieId={movieId}
              />
            ))}
            <div>
              <input
                name="name"
                type="text"
                placeholder="Cast Member"
                value={props.castForm.name}
                onChange={props.handleCastChange}
              />
              <button
                className="add-list"
                onClick={() => handleCastSubmit(movieId)}
              >
                Add
              </button>
            </div>
          </div>
          <div className="createList">
            <CreateNewList
              handleGuessListChange={handleGuessListChange}
              handleGuessListSubmit={handleGuessListSubmit}
            />
          </div>
          <div>
            {allGuessLists.map((list) => (
              <GuessList
                key={list.id}
                movieCast={props.movieCast}
                gonnerOrder={list.gonnerOrder}
                id={list.id}
                name={list.name}
                score={list.score}
                getAllGuessLists={getAllGuessLists}
                checkScore={checkScore}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Movie
