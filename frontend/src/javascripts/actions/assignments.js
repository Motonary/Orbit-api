import axios from 'axios'
import { actionTypes } from '../constants/actiontypes'
import { ROOT_URL } from '../constants/url'

export function fetchRevolvingAssignments(projectId) {
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
  title,
  description,
  deadline,
  planet_type,
  planet_size,
  orbit_pos,
  projectId
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

export function destroyAssignment(assignmentId) {
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

export function restoreAssignment(assignmentId) {
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

export function selectAssignment(assignmentId) {
  return {
    type: actionTypes.SET_SELECTED_ASSIGNMENT,
    assignmentId,
  }
}

export function disselectAssignment(assignmentId) {
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
