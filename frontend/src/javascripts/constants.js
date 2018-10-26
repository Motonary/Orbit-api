import keyMirror from 'keymirror'

export const actionTypes = keyMirror({
  // User
  SET_CURRENT_USER: null,

  // Projects
  FETCH_ALL_PROJECTS: null,
  CREATE_PROJECT: null,
  DESTROY_PROJECT: null,

  // Assignments
  FETCH_REVOLVING_ASSIGNMENTS: null,
  FETCH_DESTROYED_ASSIGNMENTS: null,
  CREATE_ASSIGNMENT: null,
  DESTROY_ASSIGNMENT: null,
  RESTORE_ASSIGNMENT: null
})

// TODO: developmentとproductionで使い分け
export const ROOT_URL = 'http://localhost:3000'

export const JWT = sessionStorage.getItem('jwt')
