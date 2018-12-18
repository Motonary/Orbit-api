import axios from 'axios'
import { actionTypes } from '../constants/actiontypes'
import { ROOT_URL } from '../constants/url'

interface BaseAction {
  type: string
  payload?: any
}

export interface FetchRevolvingAssignmentsAction extends BaseAction {
  type: string
  payload: {
    revolvingAssignments: Object
  }
}

export interface FetchDestroyedAssignmentsAction extends BaseAction {
  type: string
  payload: {
    destroyedAssignments: Object
  }
}

export interface CreateAssignmentAction extends BaseAction {
  type: string
  payload: {
    newAssignment: Object
  }
}

export interface DestroyAssignmentAction extends BaseAction {
  type: string
  payload: {
    assignmentId: string // TODO: numberかも
  }
}

export interface RestoreAssignmentAction extends BaseAction {
  type: string
  payload: {
    assignmentId: number // TODO: stringかも
  }
}

export interface SelectAssignmentAction extends BaseAction {
  type: string
  payload: {
    assignmentId: number // TODO: stringかも
  }
}

export interface DisselectAssignmentAction extends BaseAction {
  type: string
  payload: {
    assignmentId: number // TODO: stringかも
  }
}

export interface NullifySelectedAssignment extends BaseAction {
  type: string
}

export type AssignmentAction =
  | FetchRevolvingAssignmentsAction
  | FetchDestroyedAssignmentsAction
  | CreateAssignmentAction
  | DestroyAssignmentAction
  | RestoreAssignmentAction
  | SelectAssignmentAction
  | DisselectAssignmentAction
  | NullifySelectedAssignment

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
        payload: {
          revolvingAssignments: res.data,
        },
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function fetchDestroyedAssignments(): Promise<FetchDestroyedAssignmentsAction | void> {
  return axios
    .get(`${ROOT_URL}/api/assignments/destroyed`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    })
    .then(res => {
      return {
        type: actionTypes.FETCH_DESTROYED_ASSIGNMENTS,
        payload: {
          destroyedAssignments: res.data,
        },
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
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
      return {
        type: actionTypes.CREATE_ASSIGNMENT,
        payload: {
          newAssignment: res.data,
        },
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function destroyAssignment(
  assignmentId: any
): Promise<DestroyAssignmentAction | void> {
  return axios({
    method: 'patch',
    url: `${ROOT_URL}/api/assignments/${assignmentId}/destroy`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
  })
    .then(() => {
      return {
        type: actionTypes.DESTROY_ASSIGNMENT,
        payload: {
          assignmentId,
        },
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function restoreAssignment(
  assignmentId: any
): Promise<RestoreAssignmentAction | void> {
  return axios({
    method: 'patch',
    url: `${ROOT_URL}/api/assignments/${assignmentId}/restore`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
  })
    .then(() => {
      return {
        type: actionTypes.RESTORE_ASSIGNMENT,
        payload: {
          assignmentId,
        },
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function selectAssignment(assignmentId: any): SelectAssignmentAction {
  return {
    type: actionTypes.SELECT_ASSIGNMENT,
    payload: {
      assignmentId,
    },
  }
}

export function disselectAssignment(
  assignmentId: any
): DisselectAssignmentAction {
  return {
    type: actionTypes.DISSELECT_ASSIGNMENT,
    payload: {
      assignmentId,
    },
  }
}

export function nullifySelectedAssignment(): NullifySelectedAssignment {
  return {
    type: actionTypes.NULLIFY_SELECTED_ASSIGNMENT,
  }
}
