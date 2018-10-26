import { actionTypes } from '../constants'

export function allAssignments(state = [], action) {
  switch(action.type) {
    case actionTypes.SET_ALL_ASSIGNMENTS:
      return action.allAssignments

    default:
      return state
  }
}

export function destroyedAssignments(state = [], action) {
  switch(action.type) {
    case actionTypes.SET_DESTROYED_ASSIGNMENTS:
      return action.destroyedAssignments

    default:
      return state
  }
}
