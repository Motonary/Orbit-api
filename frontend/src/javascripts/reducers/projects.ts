import { actionTypes } from '../constants/action-types'
import _ from 'lodash'
import {
  RevoivingProjectsAction,
  CurrentProjectAction,
} from '../actions/projects'

/*
 * revolvingProjectsの利用用途
 * stateには、current_userの持つ全Projectのidがkeyとなって格納される
 */
export function revolvingProjects(
  state: any = null,
  action: RevoivingProjectsAction
) {
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
export function currentProject(
  state: any = null,
  action: CurrentProjectAction
) {
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
 * stateには、Mypage上でユーザがクリックし、UIとしてはチェックマーク付きのPlanetに紐付いたProjectIdsが格納される
 */
export function selectedProjects(state: any = null, action: any) {
  switch (action.type) {
    default:
      return state
  }
}
