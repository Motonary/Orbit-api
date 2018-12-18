import { actionTypes } from '../constants/actiontypes'
import _ from 'lodash'
import { AssignmentAction } from '../actions/assignments'

export function revolvingAssignments(
  state: any = null,
  action: AssignmentAction
) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.FETCH_REVOLVING_ASSIGNMENTS:
      return action.payload.revolvingAssignments

    case actionTypes.CREATE_ASSIGNMENT:
      const newAssignmentOrbit = action.payload.newAssignment.orbit_pos
      newState[newAssignmentOrbit].push(action.payload.newAssignment)
      return newState

    case actionTypes.DESTROY_ASSIGNMENT:
      // TODO: あとでやる
      return _.remove(
        [...state],
        eachState => eachState.id !== action.payload.assignmentId
      )

    default:
      return state
  }
}

export function selectedAssignments(state: any = [], action: AssignmentAction) {
  switch (action.type) {
    case actionTypes.SELECT_ASSIGNMENT:
      return [...state, action.payload.assignmentId]

    case actionTypes.DISSELECT_ASSIGNMENT:
      return state.filter((item: any) => item !== action.payload.assignmentId)

    case actionTypes.NULLIFY_SELECTED_ASSIGNMENT:
      return []

    default:
      return state
  }
}

export function destroyedAssignments(
  state: any = null,
  action: AssignmentAction
) {
  switch (action.type) {
    case actionTypes.FETCH_DESTROYED_ASSIGNMENTS:
      return action.payload.destroyedAssignments

    case actionTypes.RESTORE_ASSIGNMENT:
      return _.remove(
        [...state],
        eachState => eachState.id !== action.payload.assignmentId
      )

    default:
      return state
  }
}
