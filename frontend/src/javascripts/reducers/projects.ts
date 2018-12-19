import { actionTypes } from '../constants/action-types'
import _ from 'lodash'
import { ProjectAction } from '../actions/projects'

export function revolvingProjects(state: any = null, action: ProjectAction) {
  switch (action.type) {
    case actionTypes.FETCH_REVOLVING_PROJECTS:
      return _.mapKeys(action.payload.currentUserAllProjects, 'id')

    case actionTypes.CREATE_PROJECT:
      const { newProject } = action.payload
      return {
        ...state,
        [newProject.id]: newProject,
      }

    // Project削除のanimationを実装ごにテスト
    case actionTypes.DESTROY_PROJECT:
      return _.omit(state, action.payload.projectId)

    default:
      return state
  }
}

export function currentProject(state: any = null, action: ProjectAction) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PROJECT:
      return action.payload.currentProject

    default:
      return state
  }
}

export function selectedProjects(state: any = null, action: ProjectAction) {
  switch (action.type) {
    default:
      return state
  }
}
