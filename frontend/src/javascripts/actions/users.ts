import axios from 'axios'
import { actionTypes } from '../constants/action-types'
import { BaseAction } from '../constants/static-types'
import { ROOT_URL } from '../constants/url'

// -------------------------------------------------------------------------------------
// CurrentUser
// -------------------------------------------------------------------------------------
interface CreateUserAction extends BaseAction {
  type: string
  payload: { currentUser: Object }
}

interface CreateSessionAction extends BaseAction {
  type: string
  payload: { currentUser: Object }
}

interface FetchCurrentUserAction extends BaseAction {
  type: string
  payload: { currentUser: Object }
}

interface ExpireCurrentUserAction extends BaseAction {
  type: string
}

interface UpdateUserImgAction extends BaseAction {
  type: string
  payload: { newAvatarUrl: string }
}

interface UpdateProfileAction extends BaseAction {
  type: string
  payload: { updatedUser: Object }
}

export type CurrentUserAction =
  | CreateUserAction
  | CreateSessionAction
  | FetchCurrentUserAction
  | ExpireCurrentUserAction
  | UpdateUserImgAction
  | UpdateProfileAction

export function createUser(
  name: any,
  email: any,
  password: any,
  password_confirmation: any
  // callback: any
): Promise<CreateUserAction | void> {
  return axios
    .post(`${ROOT_URL}/api/signup`, {
      user: { name, email, password, password_confirmation },
    })
    .then(res => {
      createSession(email, password) // Promise
      return {
        type: actionTypes.SET_CURRENT_USER,
        payload: { currentUser: res.data },
      }
    })
    .catch((err: any) => alert(`Sorry, something went wrong...\n ${err}`))
}

export function createSession(
  email: any,
  password: any
): Promise<CreateSessionAction | void> {
  return axios
    .post(`${ROOT_URL}/api/user_token`, {
      auth: { email: email, password: password },
    })
    .then(res => {
      sessionStorage.setItem('jwt', res.data.jwt.token)
      const user: Object = res.data.signinUser
      return {
        type: actionTypes.SET_CURRENT_USER,
        payload: { currentUser: user },
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function fetchCurrentUser(): Promise<FetchCurrentUserAction | void> {
  return axios
    .get(`${ROOT_URL}/api/current_user`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    })
    .then(res => {
      return {
        type: actionTypes.SET_CURRENT_USER,
        payload: { currentUser: res.data },
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function expireCurrentUser(callback: any): ExpireCurrentUserAction {
  sessionStorage.removeItem('jwt')
  callback()
  return { type: actionTypes.EXPIRE_CURRENT_USER }
}

export function updateUserImg(
  newAvatar: any
): Promise<UpdateUserImgAction | void> {
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
        payload: { newAvatarUrl: res.data },
      }
    })
    .catch(error => alert(error))
}

export function updateProfile(
  name: any = null,
  email: any = null,
  password: any,
  password_confirmation: any
): Promise<UpdateProfileAction | void> {
  return axios({
    method: 'patch',
    url: `${ROOT_URL}/api/users/update_profile`,
    data: { user: { name, email, password, password_confirmation } },
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
  })
    .then(res => {
      return {
        type: actionTypes.UPDATE_PROFILE,
        payload: { updatedUser: res.data },
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}
