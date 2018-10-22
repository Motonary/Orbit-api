import { actionTypes } from '../constants'

export default (state = null, action) => {
  switch(action.type) {
    case actionTypes.CREATE_USER:
      return action.newUser

    case actionTypes.CREATE_SESSION:
      return action.loginUser

    case actionTypes.SET_CURRENT_USER:
      return action.currentUser

    default:
      return state
  }
}
