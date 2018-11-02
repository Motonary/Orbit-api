import axios from 'axios'
import { actionTypes, ROOT_URL, JWT } from '../constants'

export function fetchRevolvingProjects() {
  return axios.get(`${ROOT_URL}/api/projects`, { headers: {
    'Authorization': `Bearer ${JWT}`
  } }).then(res => {
    return {
      type: actionTypes.FETCH_ALL_PROJECTS,
      currentUserAllProjects: res.data
    }
  }).catch(() => alert('Sorry, something went wrong...'))
}

export function setCurrentProject(currentProject, callback) {
  callback()
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    currentProject
  }
}

export function createProject(title, starType, callback) {
  return axios({
    method: 'post',
    url: `${ROOT_URL}/api/projects`,
    headers: { 'Authorization': `Bearer ${JWT}` },
    data: { project: { title, star_type: starType } }
  }).then(res => {
      callback(res.data.id)
      return {
        type: actionTypes.CREATE_PROJECT,
        newProject: res.data
      }
    }).catch(() => alert('Sorry, something went wrong...'))
}

export function destroyProject(projectId) {
  return axios({
    method: 'delete',
    url: `${ROOT_URL}/api/projects/${projectId}`,
    headers: { 'Authorization': `Bearer ${JWT}` }
  }).then(() => {
      return {
        type: actionTypes.DESTROY_PROJECT,
        projectId
      }
    }).catch(() => alert('Sorry, something went wrong...'))
}
