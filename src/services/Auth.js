import Client from './api'

// Axios call to check token, verify and sign in user
export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

// Axios call to create a new user
export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

// Data needed as input in password update
export const PasswordUpdate = async ({
  userId,
  oldPassword,
  newPassword,
  confirmNewPassword
}) => {
  // Axios call to make update password
  try {
    const res = await Client.put(`auth/update/${userId}`, {
      oldPassword,
      newPassword,
      confirmNewPassword
    })
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

// Axios call to verify if user is still signed in and authorized to make certain requests.
export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}
