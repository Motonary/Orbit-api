import { actionTypes } from '../constants'
import _ from 'lodash'

export function revolvingAssignments(state = {}, action) {
  let newState = Object.assign({}, state)
  switch(action.type) {
    case actionTypes.FETCH_REVOLVING_ASSIGNMENTS:
      return action.revolvingAssignments

    case actionTypes.CREATE_ASSIGNMENT:
      const newAssignmentOrbit = action.newAssignment.orbit_pos
      newState.newAssignmentOrbit.push(action.newAssignment)
      return newState

    case actionTypes.DESTROY_ASSIGNMENT:
      // TODO: あとでやる
      return _.remove([...state], eachState => eachState.id !== action.assignmentId)

    default:
      return state
  }
}

export function selectedProjects(state = null, action) {
  switch(action.type) {
    default:
      return state
  }
}

export function selectedAssignments(state = null, action) {
  switch(action.type) {
    case actionTypes.SELET_ASSIGNMENT:
      return [...state, action.assignmentId]

    // TODO(Yuki): 選択解除の処理書く

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
