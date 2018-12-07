import React, { Component } from 'react'
import { connect } from 'react-redux'
//import anime from 'animejs'

import {
  setDestroyAction,
  resetDestroyAction,
  resetModalStatus,
} from '../../actions/common'
import { nullifySelectedAssignment } from '../../actions/assignments'

import { DeleteActions } from '../../constants/images'

import '../../../stylesheets/destroy_animate.scss'

class Missle extends Component {
  componentDidUpdate(/*prevProps, prevState*/) {
    const selected = this.selectedAssignments && !this.props.modalOpen
    if (selected && this.props.selectedDestroyAction === 'Missle') {
      this.iginiteMissleAnimation()
    }
  }

  waitFunc(sec) {
    return function() {
      return new Promise(function(resolve) {
        setTimeout(resolve, sec * 1000)
      })
    }
  }

  onIgniteDestroyAnimation() {
    const targetDom = document.getElementById('project-orbit')
    const insertDom = document.getElementById('fixed-star')
    const actionKey = this.props.selectedDestroyAction
    let newDiv = document.createElement('div')
    let newImg = document.createElement('img')
    newDiv.classList.add('destroy-action')
    newImg.src = DeleteActions[actionKey]
    newDiv.appendChild(newImg)
    targetDom.insertBefore(newDiv, insertDom)
    this.makeMovement()
  }

  makeMovement() {
    const movDom = document.getElementsByClassName('destroy-action')[0]
    let targetDom
    if (this.props.selectedAssignments) {
      targetDom = document.getElementById(this.props.selectedAssignments[0])
    }

    // 要素の位置座標を取得.
    const clientRectMov = movDom.getBoundingClientRect()
    const clientRectTarget = targetDom.getBoundingClientRect()

    // 画面の左端から、要素の左端までの距離
    const xM = clientRectMov.left
    const xT = clientRectTarget.left
    // 画面の上端から、要素の上端までの距離
    const yM = clientRectMov.top
    const yT = clientRectTarget.top

    const disX = xT - xM
    const disY = yT - yM

    movDom.classList.add('move-animation')
    movDom.style.transform = `translateX(${disX}px) translateY(${disY}px)`

    //TODO: async/awaitで再実装
    Promise.resolve()
      .then(this.waitFunc(2.5))
      .then(() => {
        this.onClickDestroyPlanets(this.props.selectedAssignments)
      })
  }

  removePlanet(parent) {
    //FIXME: 一旦canvas以外のImgとballoonを削除・DOM上にはPlanetを表示する親要素は残る。
    parent.map(doc => {
      let parent = doc
      let child = doc.firstChild
      parent.removeChild(child)
    })
  }

  removeAssignmentData(parent) {
    parent.map(doc => {
      let cvs = doc.children[1]
      let cvs_info = cvs.id.split('-')
      this.props.destroyAssignment(cvs_info[0])
    })
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
    nullifySelectedAssignment,
  }
)(Missle)
