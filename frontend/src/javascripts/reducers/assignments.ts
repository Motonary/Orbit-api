import { actionTypes } from '../constants/actiontypes'
import _ from 'lodash'

/*
 * revolvingAssignmentsの利用用途
 * stateには、{primo, secundus, tertius}の各軌道上のassignmentsが軌道名をkeyにして格納される
 */
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

/*
 * selectedAssignmentsの利用用途
 * stateには、ユーザがクリックし、UI上でチェックマーク付きのPlanetに紐付いたAssignmentIdsが格納される
 */
export function selectedAssignments(state: any = [], action: any) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_ASSIGNMENT:
      return [...state, action.assignmentId]

    case actionTypes.REMOVE_SELECTED_ASSIGNMENT:
      return state.filter((item: any) => item !== action.assignmentId)

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
