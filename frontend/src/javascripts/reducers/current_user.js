import { actionTypes } from '../constants'

export default (state = {}, action) => {
  switch(action.type) {
    case actionTypes.CREATE_USER:
      return action.newUser

    default:
      return state
  }
}
