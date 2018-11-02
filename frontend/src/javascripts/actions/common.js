import { actionTypes } from '../constants'

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
