import { actionTypes } from '../constants'
import _ from 'lodash'

export function revolvingAssignments(state = [], action) {
  switch(action.type) {
    case actionTypes.FETCH_REVOLVING_ASSIGNMENTS:
      return action.revolvingAssignments

    case actionTypes.CREATE_ASSIGNMENT:
      return [...state, action.newAssignment]

    case actionTypes.DESTROY_ASSIGNMENT:
      return _.remove([...state], eachState => eachState.id !== action.assignmentId)

    default:
      return state
  }
}

export function destroyedAssignments(state = null, action) {
  switch(action.type) {
    case actionTypes.FETCH_DESTROYED_ASSIGNMENTS:
      return action.destroyedAssignments

    case actionTypes.RESTORE_ASSIGNMENT:
      return  _.remove([...state], eachState => eachState.id !== action.assignmentId)

    default:
      return state
  }
}
