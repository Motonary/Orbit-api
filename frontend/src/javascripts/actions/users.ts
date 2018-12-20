import axios from 'axios'
import { actionTypes } from '../constants/actiontypes'
import { ROOT_URL } from '../constants/url'

export function createUser(name: any, email: any, password: any, password_confirmation: any) {
  return axios
    .post(`${ROOT_URL}/api/signup`, {
      user: { name, email, password, password_confirmation },
    })
    .then(res => {
      createSession(email, password) // Promise
      return {
        type: actionTypes.SET_CURRENT_USER,
        currentUser: res.data,
      }
    })
    .catch((err: any) => alert(`Sorry, something went wrong...\n ${err}`))
}

export function createSession(email: any, password: any) {
  return axios
    .post(`${ROOT_URL}/api/user_token`, {
      auth: { email: email, password: password },
    })
    .then(res => {
      sessionStorage.setItem('jwt', res.data.jwt.token)
      const user: Object = res.data.signinUser
      return {
        type: actionTypes.SET_CURRENT_USER,
        currentUser: user,
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function fetchCurrentUser() {
  return axios
    .get(`${ROOT_URL}/api/current_user`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    })
    .then(res => {
      return {
        type: actionTypes.SET_CURRENT_USER,
        currentUser: res.data,
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function expireCurrentUser(callback: any) {
  sessionStorage.removeItem('jwt')
  callback()
  return { type: actionTypes.EXPIRE_CURRENT_USER }
}

export function updateUserImg(newAvatar: any) {
  let avatarFile = new FormData()
  avatarFile.append('avatar', newAvatar, newAvatar.name)
  return axios({
    method: 'post',
    url: `${ROOT_URL}/api/users/update_avatar`,
    data: avatarFile,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    },
  })
    .then(res => {
      return {
        type: actionTypes.UPDATE_AVATAR,
        newAvatarUrl: res.data,
      }
    })
    .catch(error => alert(error))
}

export function updateProfile(name: any = null, email: any = null, password: any, password_confirmation: any) {
  return axios({
    method: 'patch',
    url: `${ROOT_URL}/api/users/update_profile`,
    data: { user: { name, email, password, password_confirmation } },
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
  })
    .then(res => {
      return {
        type: actionTypes.UPDATE_PROFILE,
        updatedUser: res.data,
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}
