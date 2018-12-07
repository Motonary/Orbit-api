import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  setDestroyAction,
  resetDestroyAction,
  resetModalStatus,
} from '../../actions/common'
import { resetSelectedAssignment } from '../../actions/assignments'

import { DeleteActions } from '../../constants/images'

class BlackHole extends Component {
  componentDidUpdate(/*prevProps, prevState*/) {
    const selected = this.selectedAssignments && !this.props.modalOpen
    if (selected && this.props.selectedDestroyAction === 'BlackHole') {
      this.iginiteBlackHoleAnimation()
    }
  }

  iginiteBlackHoleAnimation() {
    const targetIds = this.props.selectedAssignments
    const actionKey = this.props.selectedDestroyAction
    const targetDom = document.getElementById('project-orbit')
    const insertDom = document.getElementById('fixed-star')
    const displayDoms = []

    targetIds.forEach(id => {
      displayDoms.push(document.getElementById(id).parentNode)
    })

    function withFadeOut() {
      displayDoms.forEach(displayDom => {
        let removeTarget = displayDom.children[1]
        let blackholeDom = document.getElementById(displayDom.children[2].id)

        removeTarget.classList.add('blackhole-action')
        Promise.resolve()
          .then(this.waitFunc(2.5))
          .then(() => {
            blackholeDom.classList.add('blackhole-action')
          })
      })
    }

    function removeDoms() {
      displayDoms.forEach(displayDom => {
        let removeTarget = displayDom
        displayDom.parentNode.removeChild(removeTarget)

        let blackholeDom = document.getElementById(displayDom.children[2].id)
        targetDom.removeChild(blackholeDom)
      })
    }

    displayDoms.forEach(displayDom => {
      // 要素の位置座標を取得
      let clientRectTarget = displayDom.getBoundingClientRect()
      // 画面の左端から、要素の左端までの距離
      let xT = clientRectTarget.left
      // 画面の上端から、要素の上端までの距離
      let yT = clientRectTarget.top

      let newDiv = document.createElement('div')
      let newImg = document.createElement('img')
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

    Promise.resolve()
      .then(withFadeOut())
      .then(this.waitFunc(3))
      .then(removeDoms())
  }

  render() {
    const { icon } = this.props
    return (
      <li className="delete-btn">
        <img src={icon} className="delete-icon" />
      </li>
    )
  }
}

export default connect(
  ({ selectedAssignments, selectedDestroyAction, modalOpen }) => ({
    selectedAssignments,
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
