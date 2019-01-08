import axios from 'axios'
import Alert from 'react-s-alert'
import { actionTypes } from '../constants/action-types'
import { BaseAction } from '../constants/static-types'
import { ROOT_URL } from '../constants/url'

// -------------------------------------------------------------------------------------
// Flash
// -------------------------------------------------------------------------------------
function showSuccessFlash(successMessage: string) {
  Alert.success(successMessage, {
    position: 'top-right',
    effect: 'jelly',
    timeout: 3000,
    offset: 80,
  })
}

function showErrorFlash(errorMessage: string) {
  Alert.error(errorMessage, {
    position: 'top-right',
    effect: 'jelly',
    timeout: 3000,
    offset: 80,
  })
}

// -------------------------------------------------------------------------------------
// RevolvingAssignments
// -------------------------------------------------------------------------------------
interface FetchRevolvingAssignmentsAction extends BaseAction {
  type: string
  payload: { revolvingAssignments: Object }
}

interface CreateAssignmentAction extends BaseAction {
  type: string
  payload: { newAssignment: any } // newAssignment.idの型エラー回避のため一時的にanyに
}

interface DestroyAssignmentAction extends BaseAction {
  type: string
  payload: { destroyedAssignment: any }
}

export type RevolvingAssignmentsAction =
  | FetchRevolvingAssignmentsAction
  | CreateAssignmentAction
  | DestroyAssignmentAction

export function fetchRevolvingAssignments(
  projectId: any
): Promise<FetchRevolvingAssignmentsAction | void> {
  return axios
    .get(`${ROOT_URL}/api/assignments/revolving`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
      params: { project_id: projectId },
    })
    .then(res => {
      return {
        type: actionTypes.FETCH_REVOLVING_ASSIGNMENTS,
        payload: { revolvingAssignments: res.data },
      }
    })
    .catch(() => showErrorFlash('Sorry, something went wrong. Please reload.'))
}

export function createAssignment(
  title: any,
  description: any,
  deadline: any,
  planet_type: any,
  planet_size: any,
  orbit_pos: any,
  projectId: any
): Promise<CreateAssignmentAction | void> {
  return axios({
    method: 'post',
    url: `${ROOT_URL}/api/assignments`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    data: {
      assignment: {
        title,
        description,
        deadline,
        planet_type,
        planet_size,
        orbit_pos,
      },
      project_id: projectId,
    },
  })
    .then(res => {
      if (res.status === 200) {
        showSuccessFlash('Successfully created!')
        return {
          type: actionTypes.CREATE_ASSIGNMENT,
          payload: { newAssignment: res.data },
        }
      } else if (res.status === 204) {
        showErrorFlash('Unable to put 5 stars on an orbit...')
      }
    })
    .catch(() => showErrorFlash('Sorry, something went wrong. Please reload.'))
}

export function destroyAssignment(assignmentId: any): Promise<DestroyAssignmentAction | void> {
  return axios({
    method: 'patch',
    url: `${ROOT_URL}/api/assignments/${assignmentId}/destroy`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
  })
    .then(res => {
      showSuccessFlash('Successfully destroyed!')
      return {
        type: actionTypes.DESTROY_ASSIGNMENT,
        payload: { destroyedAssignment: res.data },
      }
    })
    .catch(() => showErrorFlash('Sorry, something went wrong. Please reload.'))
}

// -------------------------------------------------------------------------------------
// SelectedAssignments
// -------------------------------------------------------------------------------------
interface SelectAssignmentAction extends BaseAction {
  type: string
  payload: { assignmentId: number } // TODO: stringかも
}

interface DisselectAssignmentAction extends BaseAction {
  type: string
  payload: { assignmentId: number } // TODO: stringかも
}

interface ResetSelectedAssignment extends BaseAction {
  type: string
}

export type SelectedAssignmentsAction =
  | SelectAssignmentAction
  | DisselectAssignmentAction
  | ResetSelectedAssignment

export function selectAssignment(assignmentId: any): SelectAssignmentAction {
  return {
    type: actionTypes.SET_SELECTED_ASSIGNMENT,
    payload: { assignmentId },
  }
}

export function disselectAssignment(assignmentId: any): DisselectAssignmentAction {
  return {
    type: actionTypes.REMOVE_SELECTED_ASSIGNMENT,
    payload: { assignmentId },
  }
}

export function resetSelectedAssignment(): ResetSelectedAssignment {
  return {
    type: actionTypes.RESET_SELECTED_ASSIGNMENT,
  }
}

// -------------------------------------------------------------------------------------
// DestroyedAssignments
// -------------------------------------------------------------------------------------
interface FetchDestroyedAssignmentsAction extends BaseAction {
  type: string
  payload: { destroyedAssignments: Object }
}

interface RestoreAssignmentAction extends BaseAction {
  type: string
  payload: { restoredAssignment: any }
}

export type DestroyedAssignmentsAction = FetchDestroyedAssignmentsAction | RestoreAssignmentAction

export function fetchDestroyedAssignments(): Promise<FetchDestroyedAssignmentsAction | void> {
  return axios
    .get(`${ROOT_URL}/api/assignments/destroyed`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    })
    .then(res => {
      return {
        type: actionTypes.FETCH_DESTROYED_ASSIGNMENTS,
        payload: { destroyedAssignments: res.data },
      }
    })
    .catch(() => showErrorFlash('Sorry, something went wrong. Please reload.'))
}

export function restoreAssignment(assignmentId: any): Promise<RestoreAssignmentAction | void> {
  return axios({
    method: 'patch',
    url: `${ROOT_URL}/api/assignments/${assignmentId}/restore`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
  })
    .then(res => {
      showSuccessFlash('Successfully restored!')
      return {
        type: actionTypes.RESTORE_ASSIGNMENT,
        payload: { restoredAssignment: res.data },
      }
    })
    .catch(() => showErrorFlash('Sorry, something went wrong. Please reload.'))
}
