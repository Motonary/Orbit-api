import { actionTypes } from '../constants'

export default (state = null, action) => {
  switch(action.type) {
    case actionTypes.SET_CURRENT_USER:
      return action.currentUser

    default:
      return state
  }
}
