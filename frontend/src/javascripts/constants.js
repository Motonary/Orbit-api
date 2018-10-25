import keyMirror from 'keymirror'

export const actionTypes = keyMirror({
  SET_CURRENT_USER: null,
  SET_ALL_PROJECTS: null,
  SET_ALL_ASSIGNMENTS: null
})

// TODO: developmentとproductionで使い分け
export const ROOT_URL = 'http://localhost:3000'

export const JWT = sessionStorage.getItem('jwt')
