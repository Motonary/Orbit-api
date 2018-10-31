import axios from 'axios'
import { actionTypes, ROOT_URL, JWT } from '../constants'

export function fetchRevolvingAssignments(projectId) {
  return axios.get(`${ROOT_URL}/api/assignments/revolving`, {
    headers: { 'Authorization': `Bearer ${JWT}` },
    params: { project_id: projectId }
   }).then(res => {
    return {
      type: actionTypes.FETCH_REVOLVING_ASSIGNMENTS,
      revolvingAssignments: res.data
    }
  }).catch(() => alert('Sorry, something went wrong...'))
}

export function fetchDestroyedAssignments() {
  return axios.get(`${ROOT_URL}/api/assignments/destroyed`, {
    headers: { 'Authorization': `Bearer ${JWT}` }
   }).then(res => {
     //console.log(res.data)
    return {
      type: actionTypes.FETCH_DESTROYED_ASSIGNMENTS,
      destroyedAssignments: res.data
    }
  }).catch(() => alert('Sorry, something went wrong...'))
}

export function createAssignment(
  title, detail, deadline, planet_type, planet_size, orbit_pos, projectId
) {
    return axios({
      method: 'post',
      url: `${ROOT_URL}/api/assignments`,
      headers: { 'Authorization': `Bearer ${JWT}` },
      data: {
        assignment: { title, detail, deadline, planet_type, planet_size, orbit_pos },
        project_id: projectId
      }
    }).then(res => {
      return {
        type: actionTypes.CREATE_ASSIGNMENT,
        newAssignment: res.data
      }
    }).catch(() => alert('Sorry, something went wrong...'))
}

export function destroyAssignment(assignmentId) {
  return axios({
    method: 'patch',
    url: `${ROOT_URL}/api/assignments/${assignmentId}/destroy`,
    headers: { 'Authorization': `Bearer ${JWT}` }
  }).then(() => {
    return {
      type: actionTypes.DESTROY_ASSIGNMENT,
      assignmentId
    }
  }).catch(() => alert('Sorry, something went wrong...'))
}

export function restoreAssignment(assignmentId) {
  return axios({
    method: 'patch',
    url: `${ROOT_URL}/api/assignments/${assignmentId}/restore`,
    headers: { 'Authorization': `Bearer ${JWT}` }
  }).then(() => {
    return {
      type: actionTypes.RESTORE_ASSIGNMENT,
      assignmentId
    }
  }).catch(() => alert('Sorry, something went wrong...'))
}
