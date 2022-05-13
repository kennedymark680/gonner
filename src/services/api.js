import Axios from 'axios'

//Universal API call for the entire Auth on the app
let apiUrl = 'https://gonner-backend.herokuapp.com'

const Client = Axios.create({ baseURL: apiUrl })

// Intercepts every request axios makes
Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
