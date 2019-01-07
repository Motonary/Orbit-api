import { actionTypes } from '../constants/action-types'
import _ from 'lodash'
import moment from 'moment'
import {
  RevolvingAssignmentsAction,
  SelectedAssignmentsAction,
  DestroyedAssignmentsAction,
} from '../actions/assignments'
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
  let cloneState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.FETCH_REVOLVING_ASSIGNMENTS:
      if ('revolvingAssignments' in action.payload) {
        return action.payload.revolvingAssignments
      }
      break

    case actionTypes.CREATE_ASSIGNMENT:
      if ('newAssignment' in action.payload) {
        const newAssignmentOrbit: 'primo' | 'secundus' | 'tertius' =
          action.payload.newAssignment.orbit_pos
        cloneState[newAssignmentOrbit].push(action.payload.newAssignment)
        return cloneState
      }
      break

    case actionTypes.DESTROY_ASSIGNMENT:
      if ('destroyedAssignment' in action.payload) {
        const { id, orbit_pos } = action.payload.destroyedAssignment
        _.remove(cloneState[orbit_pos], (eachAssignment: any) => eachAssignment.id === id)
        return cloneState
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
export function selectedAssignments(state: any = [], action: SelectedAssignmentsAction) {
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
  let cloneState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.FETCH_DESTROYED_ASSIGNMENTS:
      if ('destroyedAssignments' in action.payload) {
        return action.payload.destroyedAssignments
      }
      break

    case actionTypes.RESTORE_ASSIGNMENT:
      if ('restoredAssignment' in action.payload) {
        const { id, destroyed_at } = action.payload.restoredAssignment
        const destroyedYear = moment(destroyed_at).format('YYYY')
        const destroyedDate = moment(destroyed_at).format('MM/DD')
        _.remove(
          cloneState[destroyedYear][destroyedDate],
          (eachAssignment: any) => eachAssignment.id === id
        )
        return cloneState
      }
      break

    default:
      return state
  }
}
