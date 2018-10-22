import keyMirror from 'keymirror'

export const actionTypes = keyMirror({
  CREATE_USER: null,
  CREATE_SESSION: null,
  SET_CURRENT_USER: null
})

// TODO: developmentとproductionで使い分け
export const ROOT_URL = 'http://localhost:3000'
