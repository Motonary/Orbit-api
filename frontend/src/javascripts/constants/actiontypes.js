import keyMirror from 'keymirror'

export const actionTypes = keyMirror({
  // Common
  OPEN_MODAL: null,
  CLOSE_MODAL: null,
  SELECT_STAR: null,
  DISSELECT_STAR: null,
  IGNITE_DESTROY_ACTION: null,
  RESET_DESTROY_ACTION: null,

  // User
  SET_CURRENT_USER: null,
  EXPIRE_CURRENT_USER: null,
  UPDATE_AVATAR: null,
  UPDATE_PROFILE: null,

  // Projects
  FETCH_REVOLVING_PROJECTS: null,
  SET_CURRENT_PROJECT: null,
  CREATE_PROJECT: null,
  DESTROY_PROJECT: null,

  // Assignments
  FETCH_REVOLVING_ASSIGNMENTS: null,
  FETCH_DESTROYED_ASSIGNMENTS: null,
  CREATE_ASSIGNMENT: null,
  DESTROY_ASSIGNMENT: null,
  RESTORE_ASSIGNMENT: null,
  SELECT_ASSIGNMENT: null,
  DISSELECT_ASSIGNMENT: null,
  NULLIFY_SELECTED_ASSIGNMENT: null
})
