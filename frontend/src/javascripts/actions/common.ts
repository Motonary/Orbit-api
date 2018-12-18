import { actionTypes } from '../constants/actiontypes'

interface BaseAction {
  type: string
  payload?: any
}

interface SetSelectedStarAction extends BaseAction {
  type: string
  payload: { star_type: number } // TODO: stringかも
}

interface ResetSelectedStarAction extends BaseAction {
  type: string
}

interface IgniteDestroyPlanetsAction extends BaseAction {
  type: string
  payload: { status: boolean }
}

// TODO: 命名気持ち悪いかな
interface ResetDestroyActionAction extends BaseAction {
  type: string
  payload: { status: boolean }
}

interface SetModalStatusAction extends BaseAction {
  type: string
  payload: { status: boolean }
}

interface ResetMOdalStatusAction extends BaseAction {
  type: string
  payload: { status: boolean }
}

export type CommonAction =
  | SetSelectedStarAction
  | ResetSelectedStarAction
  | IgniteDestroyPlanetsAction
  | ResetDestroyActionAction
  | SetModalStatusAction
  | ResetMOdalStatusAction

export function setSelectedStar(star_type: any): SetSelectedStarAction {
  return {
    type: actionTypes.SELECT_STAR,
    payload: { star_type },
  }
}

export function resetSelectedStar(): ResetSelectedStarAction {
  return {
    type: actionTypes.DISSELECT_STAR,
  }
}

export function igniteDestroyPlanets(status: any): IgniteDestroyPlanetsAction {
  return {
    type: actionTypes.IGNITE_DESTROY_ACTION,
    payload: { status },
  }
}

export function resetDestroyAction(status: any): ResetDestroyActionAction {
  return {
    type: actionTypes.RESET_DESTROY_ACTION,
    payload: { status },
  }
}

export function setModalStatus(status: any): SetModalStatusAction {
  return {
    type: actionTypes.OPEN_MODAL,
    payload: { status },
  }
}

export function resetModalStatus(status: any): ResetMOdalStatusAction {
  return {
    type: actionTypes.CLOSE_MODAL,
    payload: { status },
  }
}
