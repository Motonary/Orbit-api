import { actionTypes } from '../constants/action-types'
import { SelectedStarAction, IsDestroyIgnitedAction, ModalOpenAction } from '../actions/common'

/*
 * selectedStarの利用用途
 * stateには、Earth、Loveなどのユーザが選択した惑星の名称が格納される
 */
export function selectedStar(state: any = null, action: SelectedStarAction) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_STAR:
      return action.payload.star_type

    case actionTypes.RESET_SELECTED_STAR:
      return null

    default:
      return state
  }
}

/*
 * selectedDestroyActionの利用用途
 * stateには、ユーザが選択したMeteorite or Missle or BlackHole いずれかの破壊モーションの名称が格納される
 */
export function selectedDestroyAction(state: any = null, action: IsDestroyIgnitedAction) {
  switch (action.type) {
    case actionTypes.SET_DESTROY_ACTION:
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
export function modalOpen(state: any = '', action: ModalOpenAction) {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return action.payload.status

    case actionTypes.CLOSE_MODAL:
      return ''

    default:
      return state
  }
}
