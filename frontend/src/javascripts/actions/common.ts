import { actionTypes } from '../constants/action-types'
import { BaseAction } from '../constants/static-types'

// -------------------------------------------------------------------------------------
// SelectedStar
// -------------------------------------------------------------------------------------
interface SetSelectedStarAction extends BaseAction {
  type: string
  payload: { star_type: number } // TODO: stringかも
}

interface ResetSelectedStarAction extends BaseAction {
  type: string
}

export type SelectedStarAction = SetSelectedStarAction | ResetSelectedStarAction

export function setSelectedStar(star_type: any): SetSelectedStarAction {
  return {
    type: actionTypes.SET_SELECTED_STAR,
    payload: { star_type },
  }
}

export function resetSelectedStar(status: any): ResetSelectedStarAction {
  return {
    type: actionTypes.RESET_SELECTED_STAR,
    payload: { status },
  }
}

// -------------------------------------------------------------------------------------
// IsDestroyIgnited
// -------------------------------------------------------------------------------------
interface IgniteDestroyPlanetsAction extends BaseAction {
  type: string
  payload: { status: boolean }
}

// TODO: 命名気持ち悪いかな
interface ResetDestroyActionAction extends BaseAction {
  type: string
  payload: { status: string }
}

export type IsDestroyIgnitedAction = IgniteDestroyPlanetsAction | ResetDestroyActionAction

export function setDestroyAction(status: any): IgniteDestroyPlanetsAction {
  return {
    type: actionTypes.SET_DESTROY_ACTION,
    payload: { status },
  }
}

export function resetDestroyAction(): ResetDestroyActionAction {
  return {
    type: actionTypes.RESET_DESTROY_ACTION,
    payload: { status },
  }
}

// -------------------------------------------------------------------------------------
// ModalOpen
// -------------------------------------------------------------------------------------
interface SetModalStatusAction extends BaseAction {
  type: string
  payload: { status: boolean }
}

interface ResetModalStatusAction extends BaseAction {
  type: string
  payload: { status: boolean }
}

export type ModalOpenAction = SetModalStatusAction | ResetModalStatusAction

export function setModalStatus(status: any): SetModalStatusAction {
  return {
    type: actionTypes.OPEN_MODAL,
    payload: { status },
  }
}

export function resetModalStatus(status: any): ResetModalStatusAction {
  return {
    type: actionTypes.CLOSE_MODAL,
    payload: { status },
  }
}
