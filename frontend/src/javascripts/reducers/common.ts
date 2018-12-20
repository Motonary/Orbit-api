import { actionTypes } from '../constants/actiontypes'

/*
 * selectedStarの利用用途
 * stateには、Earth、Loveなどのユーザが選択した惑星の名称が格納される
 */
export function selectedStar(state: any = null, action: any) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_STAR:
      return action.star_type

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
export function selectedDestroyAction(state: string = '', action: any) {
  switch (action.type) {
    case actionTypes.SET_DESTROY_ACTION:
      return action.status

    case actionTypes.RESET_DESTROY_ACTION:
      return ''

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
export function modalOpen(state: string = '', action: any) {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return action.status

    case actionTypes.CLOSE_MODAL:
      return ''

    default:
      return state
  }
}
