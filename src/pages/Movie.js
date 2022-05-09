import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import GuessList from '../components/GuessList'

const Movie = (props) => {
  // -------- VARIABLES --------------

  const { movieId } = useParams()
  const apiUrl = 'http://localhost:3001'

  // ----------- STATE -----------------

  const [characterList, setCharacterList] = useState([])
  const [allGuessLists, setAllGuessLists] = useState([])
  const [guessListName, setGuessListName] = useState({
    name: `${props.user.username}`,
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

  const handleDeath = async (castmemberId) => {
    // Check if gonnerOrder isn't more than the number of cast members
    console.log(props.movieDetails.gonnerOrder)
    if (props.movieDetails.gonnerOrder <= props.movieCast.length) {
      props.getMovieDetails(movieId)

      // Set Cast Members gonner order
      const resCastMember = await axios.put(
        `${apiUrl}/api/castmember/${castmemberId}`,
        {
          alive: false,
          order: props.movieDetails.gonnerOrder
        }
      )

      // Increment and set the new movies gonner order
      const newOrder = props.movieDetails.gonnerOrder + 1
      const resMovie = await axios.put(`${apiUrl}/api/movie/${movieId}`, {
        gonnerOrder: newOrder
      })
      props.getMovieDetails(movieId)
      props.getCastByMovieId(movieId)

      // Create the array of gonners
      let gonnerArray = []

      axios.get(`${apiUrl}/api/castmember/${movieId}`).then((res) => {
        res.data.forEach((actor) => {
          if (!actor.alive) {
            gonnerArray.push(actor)
            console.log(gonnerArray, 'gonnerArray')
          }
        })
      })

      // console.log(props.movieCast, 'props.movieCast')
      // props.movieCast.forEach((actor) => {
      //   if (!actor.alive) {
      //     gonnerArray.push(actor)
      //     console.log(gonnerArray, 'gonnerArray')
      //   }
      // })

      // Check the score for ever guess list
      for (let i = 0; i < allGuessLists.length; i++) {
        const getCharactersByListId = async () => {
          const characters = await axios.get(
            `${apiUrl}/api/character/${allGuessLists[i].id}`
          )
          setCharacterList(characters.data)
          checkScore(props.movieCast, characters.data, allGuessLists[i].id)
        }
        getCharactersByListId()
      }
    }
  }

  // ----- GUESS LIST -----
  const handleGuessListChange = (e) => {
    setGuessListName({ ...guessListName, [e.target.name]: e.target.value })
  }

  const handleGuessListSubmit = async (e) => {
    e.preventDefault()
    // creating the GUESS LIST
    console.log(props.user.username)
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
              <div key={char.id}>
                <h4>
                  {char.name}
                  <button onClick={() => handleDeath(char.id)}>X</button>
                  <button
                    onClick={() => props.deleteCastMember(char.id, movieId)}
                  >
                    Delete
                  </button>
                  <p>{char.order}</p>
                </h4>
              </div>
            ))}
            <div>
              <input
                name="name"
                type="text"
                placeholder="Cast Member"
                value={props.castForm.name}
                onChange={props.handleCastChange}
              />
            </div>
            <button onClick={() => handleCastSubmit(movieId)}>Add</button>
            <button onClick={() => console.log()}>Increase</button>
          </div>
          <div className="createList">
            <h2>Create New List</h2>
            <input name="name" onChange={handleGuessListChange} />
            <button onClick={handleGuessListSubmit}>Create List</button>
          </div>
          <button onClick={createCharacters}></button>
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
