import { actionTypes } from '../constants'

export function setSelectedStar(star_type) {
  return {
    type: actionTypes.SELECT_STAR,
    star_type
  }
}

export function resetSelectedStar() {
  return {
    type: actionTypes.DISSELECT_STAR
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
