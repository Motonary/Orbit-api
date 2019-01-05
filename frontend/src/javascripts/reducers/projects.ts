import { actionTypes } from '../constants/action-types'
import _ from 'lodash'
import {
  RevoivingProjectsAction,
  CurrentProjectAction,
  SelectedProjectAction,
} from '../actions/projects'

/*
 * revolvingProjectsの利用用途
 * stateには、current_userの持つ全Projectのidがkeyとなって格納される
 */
export function revolvingProjects(state: any = null, action: RevoivingProjectsAction) {
  switch (action.type) {
    case actionTypes.FETCH_REVOLVING_PROJECTS:
      if ('currentUserAllProjects' in action.payload) {
        return _.mapKeys(action.payload.currentUserAllProjects, 'id')
      }
      break

    case actionTypes.CREATE_PROJECT:
      if ('newProject' in action.payload) {
        const { newProject } = action.payload
        return { ...state, [newProject.id]: newProject }
      }
      break

    // TODO: Project削除のanimationを実装後にテスト
    case actionTypes.DESTROY_PROJECT:
      if ('projectId' in action.payload) {
        return _.omit(state, action.payload.projectId)
      }
      break

    default:
      return state
  }
}
/*
 * currentProjectsの利用用途
 * stateには、現在のProjectPageのProjectのオブジェクトが格納される
 */
export function currentProject(state: any = null, action: CurrentProjectAction) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PROJECT:
      if ('currentProject' in action.payload) {
        return action.payload.currentProject
      }
      break

    default:
      return state
  }
}

/*
 * selectedProjectsの利用用途
 * stateには、ユーザがクリックし、UI上でチェックマーク付きのPlanetに紐付いた"project-3-Earth"のような
 * ”project-projectId-fixedStarType”というstringが一つのみ格納される
 */
export function selectedProject(state: any = [], action: SelectedProjectAction) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_PROJECT:
      return [...state, action.payload.projectId]

    case actionTypes.REMOVE_SELECTED_PROJECT:
      return state.filter((item: any) => item !== action.payload.projectId)

    case actionTypes.RESET_SELECTED_PROJECT:
      return []

    default:
      return state
  }
}
