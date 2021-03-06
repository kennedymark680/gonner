import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import GuessList from '../components/GuessList'
import Cast from '../components/Cast'
import CreateNewList from '../components/CreateNewList'
import MovieBanner from '../components/MovieBanner'
import Scoreboard from '../components/Scoreboard'
import { BACKEND } from '../globals'

const Movie = (props) => {
  let navigate = useNavigate()

  // -------- VARIABLES --------------

  const { movieId } = useParams()

  // ----------- STATE -----------------

  const [isDeathLoading, setIsDeathLoading] = useState(false)
  const [sortedLeaders, setSortedLeaders] = useState([])
  const [allGuessLists, setAllGuessLists] = useState([])
  const [guessListName, setGuessListName] = useState({
    name: '',
    score: 0,
    gonnerOrder: 1
  })
  const [castForm, setCastForm] = useState({
    name: '',
    alive: true,
    order: null
  })

  // ----------- AXIOS CALLS -------------

  const handleCastSubmit = async () => {
    await axios.post(`${BACKEND}/api/castmember/${movieId}`, castForm)
    setCastForm({
      name: '',
      alive: true,
      order: null
    })
    props.getCastByMovieId(movieId)
  }

  const handleCastChange = (e) => {
    setCastForm({ ...castForm, [e.target.name]: e.target.value })
  }

  //=========================== GAME PLAY LOGIC ==============================

  // --------------------------- SCORING -----------------------------------
  const updateScore = async (selectedCast, allGuessLists) => {
    // Checking every list
    for (const list of allGuessLists) {
      // Finding the character in the list and checking its order.
      const foundChar = list.Characters.filter(
        (char) => selectedCast.name === char.name
      )

      // Finding the difference between the guess and the actual order.
      const difference = Math.abs(selectedCast.order - foundChar[0].order)

      let score = 0

      // Giving points based on the difference
      if (difference === 0 && !foundChar[0].alive) {
        score = 3
      } else if (difference === 1 && !foundChar[0].alive) {
        score = 1
      }

      // Update the list score
      await axios.put(`${BACKEND}/api/guesslist/score/${list.id}`, {
        score: score
      })
    }
    getAllGuessLists()
  }

  const updateScoreReverse = async (selectedCast, allGuessLists) => {
    // Checking every list
    for (const list of allGuessLists) {
      // Finding the character in the list and checking its order.
      const foundChar = list.Characters.filter(
        (char) => selectedCast.name === char.name
      )

      // Finding the difference between the guess and the actual order.
      const difference = Math.abs(selectedCast.order - foundChar[0].order)

      let score = 0

      // Reversing the given points
      if (difference === 0 && !foundChar[0].alive) {
        score = -3
      } else if (difference === 1 && !foundChar[0].alive) {
        score = -1
      }

      // Updating the score for each list
      await axios.put(`${BACKEND}/api/guesslist/score/${list.id}`, {
        score: score
      })
    }
    getAllGuessLists()
  }

  // ------------------------------ CAST DIES -----------------------------------

  const handleDeath = async (castmemberId) => {
    // Making sure deaths can't exceed the cast number
    if (props.movieDetails.gonnerOrder <= props.movieCast.length) {
      setIsDeathLoading(true)

      // Set Cast Members gonner order
      const resCastMember = await axios.put(
        `${BACKEND}/api/castmember/${castmemberId}`,
        {
          alive: false,
          order: props.movieDetails.gonnerOrder
        }
      )

      // Sending the deceased cast member to the updateScore function
      let selectedCast = resCastMember.data[0]
      updateScore(selectedCast, allGuessLists)

      // Increase gonner order
      const newOrder = props.movieDetails.gonnerOrder + 1
      await axios.put(`${BACKEND}/api/movie/${movieId}`, {
        gonnerOrder: newOrder
      })
      setIsDeathLoading(false)
      props.getCastByMovieId(movieId)
    }
  }

  const handleDeathReverse = async (cast) => {
    // Take points away from the lists
    updateScoreReverse(cast, allGuessLists)

    // Change the gonnerOrder of the movie
    const newOrder = props.movieDetails.gonnerOrder - 1
    await axios.put(`${BACKEND}/api/movie/${movieId}`, {
      gonnerOrder: newOrder
    })

    // Reverting the cast members status
    const resCastMember = await axios.put(
      `${BACKEND}/api/castmember/${cast.id}`,
      {
        alive: true,
        order: null
      }
    )

    // Call to reload the cast list
    props.getCastByMovieId(movieId)
  }

  // ------------------------------ CAST LIVES -----------------------------------

  const handleLived = async (castMember) => {
    // Check all the lists and if the name and order match give 3 points
    for (const list of allGuessLists) {
      const foundChar = list.Characters.filter(
        (char) => castMember.name === char.name
      )

      if (foundChar[0].alive) {
        await axios.put(`${BACKEND}/api/guesslist/score/${list.id}`, {
          score: 3
        })
      }
    }
    getAllGuessLists()
  }

  const handleLivedReverse = async (castMember) => {
    // Reverse the points given by handleLived
    for (const list of allGuessLists) {
      const foundChar = list.Characters.filter(
        (char) => castMember.name === char.name
      )

      if (foundChar[0].alive) {
        await axios.put(`${BACKEND}/api/guesslist/score/${list.id}`, {
          score: -3
        })
      }
    }
    getAllGuessLists()
  }

  // ------------------------------ GUESS LIST CREATION ----------------------------------------

  const handleGuessListChange = (e) => {
    setGuessListName({ ...guessListName, [e.target.name]: e.target.value })
  }

  // Create a character for the list
  const createCharacters = async (guesslistId, character) => {
    await axios.post(`${BACKEND}/api/character/${guesslistId}`, character)
  }

  const handleGuessListSubmit = async (e) => {
    e.preventDefault()
    // creating the GUESS LIST
    const res = await axios.post(
      `${BACKEND}/api/guesslist/${movieId}`,
      guessListName
    )

    // creating each CHARACTER for the list
    for (let i = 0; i < props.movieCast.length; i++) {
      let character = {
        name: props.movieCast[i].name,
        order: null,
        alive: true
      }
      createCharacters(res.data.id, character)
    }

    // Reset the values for the list creation
    setGuessListName({
      name: '',
      score: 0,
      gonnerOrder: 1
    })
    getAllGuessLists()
  }

  const getAllGuessLists = async () => {
    const res = await axios.get(`${BACKEND}/api/guesslist/${movieId}`)
    setAllGuessLists(res.data)
    sortLeaders(res.data)
  }

  // ---------------------------- SORT LEADERS -------------------------------------

  const sortLeaders = (scrambled) => {
    let sortedLeaders = scrambled.sort((a, b) => b.score - a.score)
    setSortedLeaders(sortedLeaders)
  }

  // ---------------------------- DELETE MOVIE -------------------------------------
  const deleteMovie = async () => {
    await axios.delete(`${BACKEND}/api/movie/${movieId}`)
    navigate('/home')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getAllGuessLists()
      props.getMovieDetails(movieId)
      props.getCastByMovieId(movieId)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {props.movieDetails ? (
        <div className="movie-page">
          <button
            className="white-red-button back"
            onClick={() => navigate('/home')}
          >
            {'<'}
          </button>
          <div className="movie-banner-rapper">
            <MovieBanner movieDetails={props.movieDetails} />
          </div>
          <div className="cast-score-wrapper">
            <div className="cast-score">
              <div className="cast-section">
                <h2>Cast</h2>
                {props.movieCast.map((char) => (
                  <Cast
                    key={char.id}
                    char={char}
                    handleDeath={handleDeath}
                    deleteCastMember={props.deleteCastMember}
                    movieId={movieId}
                    handleLived={handleLived}
                    allGuessLists={allGuessLists}
                    handleDeathReverse={handleDeathReverse}
                    handleLivedReverse={handleLivedReverse}
                    isDeathLoading={isDeathLoading}
                  />
                ))}
                <div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Cast Member"
                    value={castForm.name}
                    onChange={handleCastChange}
                  />
                  <button
                    className="add-list"
                    onClick={() => handleCastSubmit(movieId)}
                  >
                    Add
                  </button>
                </div>
              </div>
              <Scoreboard sortedLeaders={sortedLeaders} />
            </div>
          </div>
          <div className="createList">
            <CreateNewList
              guessListName={guessListName}
              handleGuessListChange={handleGuessListChange}
              handleGuessListSubmit={handleGuessListSubmit}
            />
          </div>
          <div className="guess-list-section">
            {allGuessLists.map((list) => (
              <GuessList
                key={list.id}
                movieCast={props.movieCast}
                gonnerOrder={list.gonnerOrder}
                id={list.id}
                name={list.name}
                score={list.score}
                getAllGuessLists={getAllGuessLists}
              />
            ))}
          </div>
          <button className="white-red-button" onClick={() => deleteMovie()}>
            Delete Movie
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Movie
