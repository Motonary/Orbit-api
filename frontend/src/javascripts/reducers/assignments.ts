import { actionTypes } from '../constants/action-types'
import _ from 'lodash'
import { RevolvingAssignmentsAction, SelectedAssignmentsAction, DestroyedAssignmentsAction } from '../actions/assignments'
// import {
//   RevolvingAssignmentsState,
//   SelectedAssignmentsState,
//   DestroyedAssignmentsState,
// } from '../constants/static-types'

/*
 * revolvingAssignmentsの利用用途
 * stateには、{primo, secundus, tertius}の各軌道上のassignmentsが軌道名をkeyにして格納される
 */
export function revolvingAssignments(state: any = null, action: RevolvingAssignmentsAction) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.FETCH_REVOLVING_ASSIGNMENTS:
      if ('revolvingAssignments' in action.payload) {
        return action.payload.revolvingAssignments
      }
      break

    case actionTypes.CREATE_ASSIGNMENT:
      if ('newAssignment' in action.payload) {
        const newAssignmentOrbit: 'primo' | 'secundus' | 'tertius' = action.payload.newAssignment.orbit_pos
        newState[newAssignmentOrbit].push(action.payload.newAssignment)
        return newState
      }
      break

    case actionTypes.DESTROY_ASSIGNMENT:
      // TODO: あとでやる
      if ('assignmentId' in action.payload) {
        // const { assignmentId } = action.payload
        // return _.remove([...state], eachState => eachState.id !== assignmentId)
      }
      break

    default:
      return state
  }
}

/*
 * selectedAssignmentsの利用用途
 * stateには、ユーザがクリックし、UI上でチェックマーク付きのPlanetに紐付いた"3-Earth"のような
 * ”assignmentId-planetType”というstringが格納される
 */
export function selectedAssignments(state: any, action: SelectedAssignmentsAction) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_ASSIGNMENT:
      return [...state, action.payload.assignmentId]

    case actionTypes.REMOVE_SELECTED_ASSIGNMENT:
      return state.filter((item: any) => item !== action.payload.assignmentId)

    case actionTypes.RESET_SELECTED_ASSIGNMENT:
      return []

    default:
      return state
  }
}

/*
 * destroyedAssignmentsの利用用途
 * stateには、UI上からすでに削除され、履歴ページに表示されるためのAssignmentsが格納される
 */
export function destroyedAssignments(state: any = null, action: DestroyedAssignmentsAction) {
  switch (action.type) {
    case actionTypes.FETCH_DESTROYED_ASSIGNMENTS:
      if ('destroyedAssignments' in action.payload) {
        return action.payload.destroyedAssignments
      }
      break

    case actionTypes.RESTORE_ASSIGNMENT:
      if ('assignmentId' in action.payload) {
        const { assignmentId } = action.payload
        return _.remove([...state], eachState => eachState.id !== assignmentId)
      }
      break

    default:
      return state
  }
}
