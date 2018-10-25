import { actionTypes } from '../constants'

export default (state = [], action) => {
  switch(action.type) {
    case actionTypes.SET_ALL_ASSIGNMENTS:
      return action.allAssignments

    default:
      return state
  }
}
