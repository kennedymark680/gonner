import NavBar from '../components/NavBar'
import Login from './Login'
import Register from './Register'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = ({ setUser, toggleAuthenticated }) => {
  let navigate = useNavigate()

  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)

  const toggleLogin = () => {
    setLogin(!login)
  }
  const toggleRegister = () => {
    setRegister(!register)
  }

  return (
    <div>
      <NavBar />
      <div className="gonner-logo"></div>
      <div className="landing-buttons">
        <button onClick={() => toggleLogin()}>Login</button>
        <button onClick={() => toggleRegister()}>Register</button>
        <button onClick={() => navigate('/home')}>Guest</button>
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
