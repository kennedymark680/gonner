import NavBar from '../components/NavBar'
import Login from './Login'
import Register from './Register'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GonnerLogo from '../resources/gonnerTran.png'

const Landing = ({ setUser, toggleAuthenticated }) => {
  let navigate = useNavigate()

  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)

  const toggleLogin = () => {
    setRegister(false)
    setLogin(!login)
  }
  const toggleRegister = () => {
    setLogin(false)
    setRegister(!register)
  }

  return (
    <div className="landing">
      <img src={GonnerLogo} alt="gonnerLogo" className="gonner-logo" />
      <h4>
        The game where they die and you win. Watch a movie with friends, list
        your predictions, earn points and compete!
      </h4>
      <div>
        <button onClick={toggleLogin} className="white-red-button">
          Login
        </button>
        <button onClick={toggleRegister} className="white-red-button">
          Register
        </button>
        <button onClick={() => navigate('/home')} className="white-red-button">
          Guest
        </button>
      </div>
      {login ? (
        <Login setUser={setUser} toggleAuthenticated={toggleAuthenticated} />
      ) : null}
      {register ? (
        <Register toggleRegister={toggleRegister} toggleLogin={toggleLogin} />
      ) : null}
    </div>
  )
}

export default Landing
