import axios from 'axios'
import { actionTypes } from '../constants/actiontypes'
import { ROOT_URL } from '../constants/url'

export function fetchRevolvingProjects() {
  return axios
    .get(`${ROOT_URL}/api/projects/`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    })
    .then(res => {
      return {
        type: actionTypes.FETCH_REVOLVING_PROJECTS,
        currentUserAllProjects: res.data,
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function setCurrentProject(currentProject, callback) {
  callback()
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    currentProject,
  }
}

export function setDefaultProject(defaultProject, callback) {
  callback(defaultProject.id)
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    currentProject: defaultProject,
  }
}

export function changeCurrentProject(newProject, callback) {
  callback()
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    currentProject: newProject,
  }
}

export function createProject(title, fixed_star_type) {
  return axios({
    method: 'post',
    url: `${ROOT_URL}/api/projects`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    data: { project: { title, fixed_star_type } },
  })
    .then(res => {
      return {
        type: actionTypes.CREATE_PROJECT,
        newProject: res.data,
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function destroyProject(projectId) {
  return axios({
    method: 'delete',
    url: `${ROOT_URL}/api/projects/${projectId}`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
  })
    .then(() => {
      return {
        type: actionTypes.DESTROY_PROJECT,
        projectId,
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}
