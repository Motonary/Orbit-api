import { actionTypes } from '../constants/action-types'
import { CurrentUserAction } from '../actions/users'

// TODO: ファイル名をuser.tsにしてcurrent-userはその一部にする
export default (state: any = null, action: CurrentUserAction) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return action.payload.currentUser

    case actionTypes.EXPIRE_CURRENT_USER:
      return null

    case actionTypes.UPDATE_AVATAR: {
      let newUser = Object.assign({}, state)
      newUser.avatar = action.payload.newAvatarUrl
      return newUser
    }

    case actionTypes.UPDATE_PROFILE:
      return action.payload.updatedUser

    default:
      return state
  }
}
