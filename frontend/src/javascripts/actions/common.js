import { actionTypes } from '../constants/actiontypes'

export function setSelectedStar(star_type) {
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

export function setDestroyAction(status) {
  return {
    type: actionTypes.SET_DESTROY_ACTION,
    status,
  }
}

export function resetDestroyAction(status) {
  return {
    type: actionTypes.RESET_DESTROY_ACTION,
    status,
  }
}

export function setModalStatus(status) {
  return {
    type: actionTypes.OPEN_MODAL,
    status,
  }
}

export function resetModalStatus(status) {
  return {
    type: actionTypes.CLOSE_MODAL,
    status,
  }
}
