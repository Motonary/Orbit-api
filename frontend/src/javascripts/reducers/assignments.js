import { actionTypes } from '../constants'
import _ from 'lodash'

export function allAssignments(state = [], action) {
  switch(action.type) {
    case actionTypes.SET_ALL_ASSIGNMENTS:
      return action.allAssignments

    default:
      return state
  }
}

export function destroyedAssignments(state = null, action) {
  switch(action.type) {
    case actionTypes.SET_DESTROYED_ASSIGNMENTS:
      return action.destroyedAssignments

    case actionTypes.DESTROY_ASSIGNMENT: {
      return  _.remove([...state], eachState => eachState.id !== action.justDestroyedAssignment.id)
    }

    default:
      return state
  }
}
