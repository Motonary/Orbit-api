import { actionTypes } from '../constants/actiontypes'
import _ from 'lodash'

export function revolvingProjects(state = null, action) {
  switch (action.type) {
    case actionTypes.FETCH_REVOLVING_PROJECTS:
      return _.mapKeys(action.currentUserAllProjects, 'id')

    case actionTypes.CREATE_PROJECT:
      return { ...state, [action.newProject.id]: action.newProject }

    //Project削除のanimationを実装ごにテスト
    case actionTypes.DESTROY_PROJECT:
      return _.omit(state, action.projectId)

    default:
      return state
  }
}

export function currentProject(state = null, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PROJECT:
      return action.currentProject

    default:
      return state
  }
}

export function selectedProjects(state = null, action) {
  switch (action.type) {
    default:
      return state
  }
}
