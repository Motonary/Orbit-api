import { actionTypes } from '../constants'

export function setSelectedPlanet(planet) {
  return {
    type: actionTypes.SELECT_PLANET,
    planet
  }
}

export function resetSelectedPlanet(planet) {
  return {
    type: actionTypes.DISSELECT_PLANET,
    planet
  }
}

export function setModalStatus(status) {
  return {
    type: actionTypes.OPEN_MODAL,
    status
  }
}

export function resetModalStatus(status) {
  return {
    type: actionTypes.CLOSE_MODAL,
    status
  }
}
