import axios from 'axios'
import { actionTypes, ROOT_URL, JWT } from '../constants'

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
  return axios.post(`${ROOT_URL}/api/user_token`, {
    auth: { 'email': email, 'password': password }
  }).then(res => {
      sessionStorage.setItem('jwt', res.data.jwt.token)
      callback(res.data.signinUser.id)
      return {
        type: actionTypes.SET_CURRENT_USER,
        currentUser: res.data.signinUser
      }
    }).catch(() => alert('Sorry, something went wrong...'))
}

export function fetchCurrentUser() {
  return axios.get(`${ROOT_URL}/api/current_user`, {
    headers: { 'Authorization': `Bearer ${JWT}` }
  }).then(res => {
      return {
        type: actionTypes.SET_CURRENT_USER,
        currentUser: res.data
      }
    }).catch(() => alert('Sorry, something went wrong...'))
}

export function updateAvatar(newAvatar) {
  let avatarFile = new FormData()
  avatarFile.append('avatar', newAvatar, newAvatar.name)
  return axios({
    method: 'post',
    url: `${ROOT_URL}/api/users/update_avatar`,
    data: avatarFile,
    headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${JWT}` }
  }).then(res => {
      return {
        type: actionTypes.UPDATE_AVATAR,
        newMessageData: res.data
      }
    }).catch(error => alert(error))
}
