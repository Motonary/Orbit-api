import axios from 'axios'
import { actionTypes, ROOT_URL, JWT} from '../constants'

export function fetchAllAssignments(projectId) {
  return axios.get(`${ROOT_URL}/api/assignments`, {
    headers: { 'Authorization': `Bearer ${JWT}` },
    params: { project_id: projectId }
   }).then(res => {
    return {
      type: actionTypes.SET_ALL_ASSIGNMENTS,
      allAssignments: res.data
    }
  }).catch(() => alert('Sorry, something went wrong...'))
}

export function createAssignment(title, detail, deadline, type, size, pos, projectId) {
  return axios({
    method: 'post',
    url: `${ROOT_URL}/api/assignments`,
    headers: { 'Authorization': `Bearer ${JWT}` },
    params: { title, detail, deadline, type, size, pos, project_id: projectId }
  }).then(res => {
    return {
      type: actionTypes.SET_ALL_ASSIGNMENTS,
      allAssignments: res.data
    }
  }).catch(() => alert('Sorry, something went wrong...'))
}

export function destroyAssignment(assignmentId, projectId) {
  return axios({
    method: 'delete',
    url: `${ROOT_URL}/api/assignments/${assignmentId}`,
    headers: { 'Authorization': `Bearer ${JWT}` },
    params: { project_id: projectId }
  }).then(res => {
    return {
      type: actionTypes.SET_ALL_ASSIGNMENTS,
      allAssignments: res.data
    }
  }).catch(() => alert('Sorry, something went wrong...'))
}

export function restoreAssignment(assignmentId) {
  // hogehoge
}
