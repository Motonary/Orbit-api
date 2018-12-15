import { actionTypes } from '../constants/actiontypes'

export function setSelectedStar(star_type: any) {
  return {
    type: actionTypes.SET_SELECTED_STAR,
    star_type,
  }
}

export function resetSelectedStar() {
  return {
    type: actionTypes.RESET_SELECTED_STAR,
  }
}

export function igniteDestroyPlanets(status: any) {
  return {
    type: actionTypes.SET_DESTROY_ACTION,
    status,
  }
}

export function resetDestroyAction(status: any) {
  return {
    type: actionTypes.RESET_DESTROY_ACTION,
    status,
  }
}

export function setModalStatus(status: any) {
  return {
    type: actionTypes.OPEN_MODAL,
    status,
  }
}

export function resetModalStatus(status: any) {
  return {
    type: actionTypes.CLOSE_MODAL,
    status,
  }
}
