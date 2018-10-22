import axios from 'axios'
import { actionTypes, ROOT_URL } from '../constants'

export function createUser(name, email, password, password_confirmation, callback) {
  return axios.post(`${ROOT_URL}/api/signup`, {
    user: { name, email, password, password_confirmation }
  }).then(res => {
      callback(res.data.id)
      createSession(email, password)
      return {
        type: actionTypes.SET_CURRENT_USER,
        currentUser: res.data
      }
    }).catch(() => alert('Sorry, something went wrong...'))
}

export function createSession(email, password, callback) {
  const request = {'auth': {'email': email, 'password': password}}
  return axios.post(`${ROOT_URL}/api/user_token`, request)
    .then(res => {
      localStorage.setItem('jwt', res.data.jwt.token)
      callback(res.data.loginUser.id)
      return {
        type: actionTypes.SET_CURRENT_USER,
        currentUser: res.data.loginUser
      }
    }).catch(() => alert('Sorry, something went wrong...'))
}

export function fetchCurrentUser(jwt) {
  return axios.get(`${ROOT_URL}/api/current_user`, { params: { jwt } }).then(res => {
    return {
      type: actionTypes.SET_CURRENT_USER,
      currentUser: res.data
    }
  }).catch(() => alert('Sorry, something went wrong...'))
}
