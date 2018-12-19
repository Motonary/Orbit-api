import { actionTypes } from '../constants/action-types'
import { CommonAction } from '../actions/common'

/*
 * selectedStarの利用用途
 * stateには、Earth、Loveなどのユーザが選択した惑星の名称が格納される
 */
export function selectedStar(state: any = null, action: CommonAction) {
  switch (action.type) {
    case actionTypes.SELECT_STAR:
      return action.payload.star_type

    case actionTypes.DISSELECT_STAR:
      return null

    default:
      return state
  }
}

export function isDestroyIgnited(state: any = null, action: CommonAction) {
  switch (action.type) {
    case actionTypes.IGNITE_DESTROY_ACTION:
      return action.payload.status

    case actionTypes.RESET_DESTROY_ACTION:
      return action.payload.status

    default:
      return state
  }
}

/*
 * modalOpenの利用用途
 * stateには、form-${orbit} or destory or nullが格納される
 * form-${orbit} は、ModalがProjectもしくはAssignmentを追加するFormを伴う時に用いられる
 * destroyは、ModalがrojectもしくはAssignmentを削除する時の確認画面として開かれる時に用いられる
 */
export function modalOpen(state: any = false, action: CommonAction) {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return action.payload.status

    case actionTypes.CLOSE_MODAL:
      return null

    default:
      return state
  }
}
