import { actionTypes } from '../constants/actiontypes'
import _ from 'lodash'

/*
 * revolvingProjectsの利用用途
 * stateには、current_userの持つ全Projectのidがkeyとなって格納される
 */
export function revolvingProjects(state: any = null, action: any) {
  switch (action.type) {
    case actionTypes.FETCH_REVOLVING_PROJECTS:
      return _.mapKeys(action.currentUserAllProjects, 'id')

    case actionTypes.CREATE_PROJECT:
      return { ...state, [action.newProject.id]: action.newProject }

    // Project削除のanimationを実装ごにテスト
    case actionTypes.DESTROY_PROJECT:
      return _.omit(state, action.projectId)

    default:
      return state
  }
}

/*
 * currentProjectsの利用用途
 * stateには、現在のProjectPageのProjectのオブジェクトが格納される
 */
export function currentProject(state: any = null, action: any) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PROJECT:
      return action.currentProject

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
