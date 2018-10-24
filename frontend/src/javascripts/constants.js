import keyMirror from 'keymirror'

export const actionTypes = keyMirror({
  SET_CURRENT_USER: null,
  SET_CURRENT_USER_ALL_PROJECTS: null
})

// TODO: developmentとproductionで使い分け
export const ROOT_URL = 'http://localhost:3000'

export const JWT = sessionStorage.getItem('jwt')
