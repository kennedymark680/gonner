import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const Login = ({ setUser, toggleAuthenticated }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ username: '', password: '' })
    setUser(payload)
    toggleAuthenticated(true)
    navigate('/home')
  }

  return (
    <div className="login-page">
      <h1>Login!</h1>
      <div className="login-forms">
        <div className="input-wrapper">
          <label htmlFor="username"></label>
          <input
            onChange={handleChange}
            name="username"
            type="username"
            placeholder="Username"
            value={formValues.username}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password"></label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            required
          />
        </div>
        <div>
          <button
            className="white-red-button"
            onClick={handleSubmit}
            disabled={!formValues.username || !formValues.password}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
