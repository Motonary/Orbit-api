import { actionTypes } from '../constants'

export function modalIsOpen(state = false, action) {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return action.status

    case actionTypes.CLOSE_MODAL:
      return action.status

    default:
      return state
  }
}
