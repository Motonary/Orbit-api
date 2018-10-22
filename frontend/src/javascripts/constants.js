import keyMirror from 'keymirror'

export const actionTypes = keyMirror({
  SET_CURRENT_USER: null
})

// TODO: developmentとproductionで使い分け
export const ROOT_URL = 'http://localhost:3000'
