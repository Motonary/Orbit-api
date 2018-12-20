import axios from 'axios'
import { actionTypes } from '../constants/actiontypes'
import { ROOT_URL } from '../constants/url'

export function fetchRevolvingAssignments(projectId: any) {
  return axios
    .get(`${ROOT_URL}/api/assignments/revolving`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
      params: { project_id: projectId },
    })
    .then(res => {
      return {
        type: actionTypes.FETCH_REVOLVING_ASSIGNMENTS,
        revolvingAssignments: res.data,
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function fetchDestroyedAssignments() {
  return axios
    .get(`${ROOT_URL}/api/assignments/destroyed`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    })
    .then(res => {
      return {
        type: actionTypes.FETCH_DESTROYED_ASSIGNMENTS,
        destroyedAssignments: res.data,
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
) {
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
        newAssignment: res.data,
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function destroyAssignment(assignmentId: any) {
  return axios({
    method: 'patch',
    url: `${ROOT_URL}/api/assignments/${assignmentId}/destroy`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
  })
    .then(() => {
      return {
        type: actionTypes.DESTROY_ASSIGNMENT,
        assignmentId,
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function restoreAssignment(assignmentId: any) {
  return axios({
    method: 'patch',
    url: `${ROOT_URL}/api/assignments/${assignmentId}/restore`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
  })
    .then(() => {
      return {
        type: actionTypes.RESTORE_ASSIGNMENT,
        assignmentId,
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function selectAssignment(assignmentId: any) {
  return {
    type: actionTypes.SET_SELECTED_ASSIGNMENT,
    assignmentId,
  }
}

export function disselectAssignment(assignmentId: any) {
  return {
    type: actionTypes.REMOVE_SELECTED_ASSIGNMENT,
    assignmentId,
  }
}

export function resetSelectedAssignment() {
  return {
    type: actionTypes.RESET_SELECTED_ASSIGNMENT,
  }
}

export function setRemovedAssignment(removedAssignmentId: string) {
  return {
    type: actionTypes.SET_REMOVED_ASSIGNMENTS,
    removedAssignmentId,
  }
}
