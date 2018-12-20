import axios from 'axios'
import { actionTypes } from '../constants/action-types'
import { BaseAction } from '../constants/static-types'
import { ROOT_URL } from '../constants/url'

// -------------------------------------------------------------------------------------
// RevolvingProjects
// -------------------------------------------------------------------------------------
interface FetchRevolvingProjectsAction extends BaseAction {
  type: string
  payload: { currentUserAllProjects: Array<Object> }
}

interface CreateProjectAction extends BaseAction {
  type: string
  payload: { newProject: any } // newProject.idのところでエラーが起きてしまうので一旦any
}

interface DestroyProjectAction extends BaseAction {
  type: string
  payload: { projectId: number } // TODO: stringかも
}

export type RevoivingProjectsAction =
  | FetchRevolvingProjectsAction
  | CreateProjectAction
  | DestroyProjectAction

export function fetchRevolvingProjects(): Promise<FetchRevolvingProjectsAction | void> {
  return axios
    .get(`${ROOT_URL}/api/projects/`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    })
    .then(res => {
      return {
        type: actionTypes.FETCH_REVOLVING_PROJECTS,
        payload: { currentUserAllProjects: res.data },
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function createProject(
  title: any,
  fixed_star_type: any
): Promise<CreateProjectAction | void> {
  return axios({
    method: 'post',
    url: `${ROOT_URL}/api/projects`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    data: { project: { title, fixed_star_type } },
  })
    .then(res => {
      return {
        type: actionTypes.CREATE_PROJECT,
        payload: { newProject: res.data },
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

export function destroyProject(
  projectId: any
): Promise<DestroyProjectAction | void> {
  return axios({
    method: 'delete',
    url: `${ROOT_URL}/api/projects/${projectId}`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
  })
    .then(() => {
      return {
        type: actionTypes.DESTROY_PROJECT,
        payload: { projectId },
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}

// -------------------------------------------------------------------------------------
// CurrentProject
// -------------------------------------------------------------------------------------
interface SetCurrentProjectAction extends BaseAction {
  type: string
  payload: { currentProject: Object }
}

interface SetDefaultProjectAction extends BaseAction {
  type: string
  payload: { currentProject: Object }
}

interface ChangeCurrentProjectAction extends BaseAction {
  type: string
  payload: { currentProject: Object }
}

export type CurrentProjectAction =
  | SetCurrentProjectAction
  | SetDefaultProjectAction
  | ChangeCurrentProjectAction

export function setCurrentProject(
  currentProject: any,
  callback: any
): SetCurrentProjectAction {
  callback()
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    payload: { currentProject },
  }
}

export function setDefaultProject(
  defaultProject: any,
  callback: any
): SetDefaultProjectAction {
  callback(defaultProject.id)
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    payload: { currentProject: defaultProject },
  }
}

export function changeCurrentProject(
  newProject: any,
  callback: any
): ChangeCurrentProjectAction {
  callback()
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    payload: { currentProject: newProject },
  }
}
