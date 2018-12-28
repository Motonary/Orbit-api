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
    .catch(() => showErrorFlash('Sorry, something went wrong. Please reload.'))
}

export function createProject(
  title: any,
  description: any,
  fixed_star_type: any
): Promise<CreateProjectAction | void> {
  return axios({
    method: 'post',
    url: `${ROOT_URL}/api/projects`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    data: { project: { title, description, fixed_star_type } },
  })
    .then(res => {
      if (res.status === 200) {
        showSuccessFlash('Successfully created!')
        return {
          type: actionTypes.CREATE_PROJECT,
          payload: { newProject: res.data },
        }
      } else if (res.status === 204) {
        showErrorFlash('Unable to put 5 stars on an orbit...')
      }
    })
    .catch(() => showErrorFlash('Sorry, something went wrong. Please reload.'))
}

export function destroyProject(projectId: any): Promise<DestroyProjectAction | void> {
  return axios({
    method: 'delete',
    url: `${ROOT_URL}/api/projects/${projectId}`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
  })
    .then(() => {
      showSuccessFlash('Successfully destroyed!')
      return {
        type: actionTypes.DESTROY_PROJECT,
        payload: { projectId },
      }
    })
    .catch(() => showErrorFlash('Sorry, something went wrong. Please reload.'))
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

export function setCurrentProject(currentProject: any, callback: any): SetCurrentProjectAction {
  callback()
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    payload: { currentProject },
  }
}

export function setDefaultProject(defaultProject: any, callback: any): SetDefaultProjectAction {
  callback(defaultProject.id)
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    payload: { currentProject: defaultProject },
  }
}

export function changeCurrentProject(newProject: any, callback: any): ChangeCurrentProjectAction {
  callback()
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    payload: { currentProject: newProject },
  }
}

// -------------------------------------------------------------------------------------
// SelectedProjects
// -------------------------------------------------------------------------------------
interface SelectProjectAction extends BaseAction {
  type: string
  payload: { projectId: string }
}

interface DisselectProjectAction extends BaseAction {
  type: string
  payload: { projectId: string }
}

interface ResetSelectedProject extends BaseAction {
  type: string
}

export type SelectedProjectAction =
  | SelectProjectAction
  | DisselectProjectAction
  | ResetSelectedProject

export function selectProject(projectId: any): SelectProjectAction {
  return {
    type: actionTypes.SET_SELECTED_PROJECT,
    payload: { projectId },
  }
}

export function disselectProject(projectId: any): DisselectProjectAction {
  return {
    type: actionTypes.REMOVE_SELECTED_PROJECT,
    payload: { projectId },
  }
}

export function resetSelectedProject(): ResetSelectedProject {
  return {
    type: actionTypes.RESET_SELECTED_PROJECT,
  }
}
