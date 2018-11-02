import { actionTypes } from '../constants'
import _ from 'lodash'

export function revolvingProjects(state = null, action) {
  switch(action.type) {
    case actionTypes.FETCH_ALL_PROJECTS:
      return _.mapKeys(action.currentUserAllProjects, 'id')

    case actionTypes.CREATE_PROJECT:
      return [...state, action.newProject]

    case actionTypes.DESTROY_PROJECT:
      return _.remove([...state], eachState => eachState.id !== action.projectId)

    default:
      return state
  }
}

export function currentProject(state = null, action) {
  switch(action.type) {
    case actionTypes.SET_CURRENT_PROJECT:
      return action.currentProject

    default:
      return state
  }
}

export function selectedProjects(state = null, action) {
  switch(action.type) {
    default:
      return state
  }
}
