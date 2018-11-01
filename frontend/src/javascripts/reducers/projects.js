import { actionTypes } from '../constants'
import _ from 'lodash'

export function revolvingProjects(state = null, action) {
  switch(action.type) {
    case actionTypes.FETCH_ALL_PROJECTS:
      return action.currentUserAllProjects

    case actionTypes.CREATE_PROJECT:
      return [...state, action.newProject]

    case actionTypes.DESTROY_PROJECT:
      return _.remove([...state], eachState => eachState.id !== action.projectId)

    default:
      return state
  }
}

export function projectsOnBar(state = [], action) {
  switch(action.type) {
    case actionTypes.FETCH_PROJECTS_ON_BAR:
      return action.projectsOnBar

    default:
      return state
  }
}
