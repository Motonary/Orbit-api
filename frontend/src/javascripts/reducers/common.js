import { actionTypes } from '../constants'

export function selectedPlanet(state = null, action) {
  switch (action.type) {
    case actionTypes.SELECT_PLANET:
      return action.planet

    case actionTypes.DISSELECT_PLANET:
      return null

    default:
      return state

  }
}

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
