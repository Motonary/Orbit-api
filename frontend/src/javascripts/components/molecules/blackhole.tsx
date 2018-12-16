import React from 'react'
import { connect } from 'react-redux'

import DeleteBtn from '../atoms/buttons/delete-btn'

import {
  setDestroyAction,
  resetDestroyAction,
  resetModalStatus,
} from '../../actions/common'
import { resetSelectedAssignment } from '../../actions/assignments'

import { DeleteActions } from '../../constants/images'

interface BlackHoleProps {
  icon: string
  deleteBtnClass: string
  motionControll: () => void
  onClick: () => void

  selectedAssignments: any
  destroyedAssignments: any
  selectedDestroyAction: any
  modalOpen: any

  setDestroyAction: any
  resetDestroyAction: any
  resetModalStatus: any
  resetSelectedAssignment: any
}

class BlackHole extends React.Component<BlackHoleProps, {}> {
  componentDidUpdate(/*prevProps, prevState*/) {
    const selected: boolean =
      this.props.selectedAssignments && !this.props.modalOpen
    if (selected && this.props.selectedDestroyAction === 'BlackHole') {
      this.iginiteBlackHoleAnimation()
    }
  }

  iginiteBlackHoleAnimation() {
    const targetIds: any = this.props.selectedAssignments
    const actionKey: any = this.props.selectedDestroyAction
    const targetDom: any = document.getElementById('project-orbit')
    const insertDom: any = document.getElementById('fixed-star')
    const displayDoms: any = []

    targetIds.forEach((id: string) => {
      displayDoms.push(document.getElementById(id).parentNode)
    })

    function withFadeOut() {
      displayDoms.forEach((displayDom: any) => {
        let removeTarget: any = displayDom.children[1]
        let blackholeDom: any = document.getElementById(
          displayDom.children[2].id
        )

        removeTarget.classList.add('blackhole-action')
        setTimeout(() => {
          blackholeDom.classList.add('blackhole-action')
        }, 2500)
      })
    }

    function removeDoms() {
      displayDoms.forEach((displayDom: any) => {
        let removeTarget: any = displayDom
        displayDom.parentNode.removeChild(removeTarget)

        let blackholeDom: any = document.getElementById(
          displayDom.children[2].id
        )
        targetDom.removeChild(blackholeDom)
      })
    }

    displayDoms.forEach((displayDom: any) => {
      // 要素の位置座標を取得
      let clientRectTarget: any = displayDom.getBoundingClientRect()
      // 画面の左端から、要素の左端までの距離
      let xT: any = clientRectTarget.left
      // 画面の上端から、要素の上端までの距離
      let yT: any = clientRectTarget.top

      let newDiv: any = document.createElement('div')
      let newImg: any = document.createElement('img')
      newDiv.id = displayDom.children[2].id
      newDiv.classList.add('blackhole')
      newDiv.style.position = 'fixed'
      newDiv.style.left = `${xT}px`
      newDiv.style.top = `${yT}px`
      newDiv.style.zIndex = '-100'
      newImg.src = DeleteActions[actionKey]
      newDiv.appendChild(newImg)
      targetDom.insertBefore(newDiv, insertDom)
    })
    withFadeOut()
    setTimeout(() => {
      removeDoms()
    }, 3000)
  }

  render() {
    const { icon, deleteBtnClass, onClick } = this.props
    return (
      <DeleteBtn
        icon={icon}
        deleteBtnClass={deleteBtnClass}
        onClick={onClick}
      />
    )
  }
}

export default connect(
  ({
    selectedAssignments,
    destroyedAssignments,
    selectedDestroyAction,
    modalOpen,
  }: any) => ({
    selectedAssignments,
    destroyedAssignments,
    selectedDestroyAction,
    modalOpen,
  }),
  {
    setDestroyAction,
    resetDestroyAction,
    resetModalStatus,
    resetSelectedAssignment,
  }
)(BlackHole)
