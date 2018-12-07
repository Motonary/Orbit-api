import { actionTypes } from '../constants/actiontypes'

export function selectedStar(state = null, action) {
  switch (action.type) {
    case actionTypes.SELECT_STAR:
      return action.star_type

    case actionTypes.DISSELECT_STAR:
      return null

    default:
      return state
  }
}

export function isDestroyIgnited(state = null, action) {
  switch (action.type) {
    case actionTypes.IGNITE_DESTROY_ACTION:
      return action.status

    case actionTypes.RESET_DESTROY_ACTION:
      return action.status

    default:
      return state
  }
}

export function modalOpen(state = null, action) {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return action.status

    case actionTypes.CLOSE_MODAL:
      return null

    default:
      return state
  }
}
