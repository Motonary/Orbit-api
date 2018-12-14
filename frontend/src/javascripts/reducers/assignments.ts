import { actionTypes } from '../constants/actiontypes'
import _ from 'lodash'

export function revolvingAssignments(state: any = null, action: any) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.FETCH_REVOLVING_ASSIGNMENTS:
      return action.revolvingAssignments

    case actionTypes.CREATE_ASSIGNMENT:
      const newAssignmentOrbit = action.newAssignment.orbit_pos
      newState[newAssignmentOrbit].push(action.newAssignment)
      return newState

    case actionTypes.DESTROY_ASSIGNMENT:
      // TODO: あとでやる
      return _.remove(
        [...state],
        eachState => eachState.id !== action.assignmentId
      )

    default:
      return state
  }
}

export function selectedAssignments(state: any = [], action: any) {
  switch (action.type) {
    case actionTypes.SELECT_ASSIGNMENT:
      return [...state, action.assignmentId]

    case actionTypes.DISSELECT_ASSIGNMENT:
      return state.filter((item: any) => item !== action.assignmentId)

    case actionTypes.NULLIFY_SELECTED_ASSIGNMENT:
      return []

    default:
      return state
  }
}

export function destroyedAssignments(state: any = null, action: any) {
  switch (action.type) {
    case actionTypes.FETCH_DESTROYED_ASSIGNMENTS:
      return action.destroyedAssignments

    case actionTypes.RESTORE_ASSIGNMENT:
      return _.remove(
        [...state],
        eachState => eachState.id !== action.assignmentId
      )

    default:
      return state
  }
}
