import { actionTypes } from '../constants'

export default (state = null, action) => {
  switch(action.type) {
    case actionTypes.SET_CURRENT_USER:
      return action.currentUser

    case actionTypes.UPDATE_AVATAR: {
      let newUser = Object.assign({}, state)
      newUser.avatar = action.newAvatarUrl
      return newUser
    }

    case actionTypes.UPDATE_PROFILE:
      return action.updatedUser

    default:
      return state
  }
}
