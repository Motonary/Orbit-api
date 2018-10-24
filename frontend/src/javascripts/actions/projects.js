import axios from 'axios'
import { actionTypes, ROOT_URL, JWT } from '../constants'

export function fetchAllProjects() {
  return axios.get(`${ROOT_URL}/api/projects`, { headers: {
    'Authorization': `Bearer ${JWT}`
  } }).then(res => {
    return {
      type: actionTypes.SET_CURRENT_USER_ALL_PROJECTS,
      currentUserAllProjects: res.data
    }
  }).catch(() => alert('Sorry, something went wrong...'))
}

export function createProject(title, starType, callback) {
  // FIXME: 新規プロジェクトがUserに結びつかない
  return axios({
    method: 'post',
    url: `${ROOT_URL}/api/projects`,
    headers: { 'Authorization': `Bearer ${JWT}` },
    params: { title, star_type: starType }
  }).then(res => {
      callback(res.data[res.data.length - 1].id)
      return {
        type: actionTypes.SET_CURRENT_USER_ALL_PROJECTS,
        currentUserAllProjects: res.data
      }
    }).catch(() => alert('Sorry, something went wrong...'))
}

export function destroyProject(projectId) {
  return axios({
    method: 'delete',
    url: `${ROOT_URL}/api/projects/${projectId}`,
    headers: { 'Authorization': `Bearer ${JWT}` }
  }).then(res => {
      return {
        type: actionTypes.SET_CURRENT_USER_ALL_PROJECTS,
        currentUserAllProjects: res.data
      }
    }).catch(() => alert('Sorry, something went wrong...'))
}
