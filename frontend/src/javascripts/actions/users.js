import axios from 'axios'
import { actionTypes, ROOT_URL } from '../constants'

// TODO: catchを書く
export function createUser(username, email, password, callback) {
  return axios.post(`${ROOT_URL}/api/signup`, { username, email, password })
    .then(res => {
      callback(res.data.id)
      return {
        type: actionTypes.CREATE_USER,
        newUser: res.data
      }
    })
}

export function createSession(email, password, callback) {
  const request = {'auth': {'email': email, 'password': password}}
  return axios.post(`${ROOT_URL}/api/user_token`, request)
    .then(res => {
      localStorage.setItem('jwt', res.data.jwt.token)
      callback(res.data.loginUser.id)
      return {
        type: actionTypes.CREATE_SESSION,
        loginUser: res.data.loginUser
      }
    })
}

export function fetchCurrentUser(jwt) {
  return axios.get(`${ROOT_URL}/api/current_user`, {
    params: { jwt }
  }).then(res => {
    return {
      type: actionTypes.SET_CURRENT_USER,
      currentUser: res.data
    }
  })
}
