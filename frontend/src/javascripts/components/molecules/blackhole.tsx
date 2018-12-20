import React from 'react'
import { connect } from 'react-redux'
import anime from 'animejs'

import ActionBtn from '../atoms/buttons/action-btn'

import {
  setDestroyAction,
  resetDestroyAction,
  resetModalStatus,
} from '../../actions/common'
import {
  destroyAssignment,
  resetSelectedAssignment,
  setRemovedAssignment,
} from '../../actions/assignments'

import { DeleteActions } from '../../constants/images'

interface BlackHoleProps {
  icon: string
  actionBtnClass: string
  motionControll: () => void
  onClick: () => void

  selectedAssignments: any
  destroyedAssignments: any
  selectedDestroyAction: any
  modalOpen: any
  removedAssignments: string[]

  setDestroyAction: any
  resetDestroyAction: any
  resetModalStatus: any
  destroyAssignment: any
  resetSelectedAssignment: any
  setRemovedAssignment: any
}

class BlackHole extends React.Component<BlackHoleProps, {}> {
  shouldComponentUpdate(nextProps: any) {
    let result: boolean = true
    if (this.props.removedAssignments !== nextProps.removedAssignments) {
      return false
    }
    return result
  }

  componentDidUpdate(/*prevProps, prevState*/) {
    const selected: boolean =
      this.props.selectedAssignments.length !== 0 && this.props.modalOpen === ''
    if (selected && this.props.selectedDestroyAction === 'BlackHole') {
      this.iginiteBlackHoleAnimation()
    }
  }

  // 削除されたAssignmentIdをcanvasのidから特定し、destroyedAssignmentsに格納
  removeAssignmentData(parent: any) {
    parent.map((destroyDom: any) => {
      let destroyedCvs: any = destroyDom.children[1]
      let destroyedAssignmentId: string = destroyedCvs.id.split('-')[0]
      this.props.setRemovedAssignment(destroyedAssignmentId)
      this.props.destroyAssignment(destroyedAssignmentId)
    })
  }

  iginiteBlackHoleAnimation() {
    const targetIds: string[] = this.props.selectedAssignments
    const actionType: string = this.props.selectedDestroyAction
    const targetDom: HTMLElement = document.getElementById(
      'project-page-container'
    )
    const insertDom: HTMLElement = document.getElementById('project-container')
    const displayDoms: any = []
    let targetImgTop: number = 0
    let targetImgLeft: number = 0

    targetIds.forEach((id: string) => {
      displayDoms.push(document.getElementById(`planet-${id}`)) // planet-2-Earth <Plant />の親要素
    })

    console.log('got display doms', displayDoms)

    function appearBlackHole() {
      let newDiv: HTMLDivElement = document.createElement('div')
      let newImg: HTMLImageElement = document.createElement('img')
      newDiv.classList.add('blackhole-img')
      newImg.src = DeleteActions[actionType]
      newDiv.appendChild(newImg)
      targetDom.insertBefore(newDiv, insertDom)
      const clientRectTarget: any = newDiv.getBoundingClientRect()
      targetImgTop = clientRectTarget.top
      targetImgLeft = clientRectTarget.left

      console.log(clientRectTarget, typeof clientRectTarget)
    }

    function disappearPlanet() {
      const BlackHoleAnimation = anime.timeline()
      BlackHoleAnimation.add({
        targets: `#planet-${targetIds[0]} .planet-img-container`,
        translateX: {
          value: targetImgLeft,
          duration: 1000,
          easing: 'easeInExpo',
        },
        translateY: {
          value: -targetImgTop,
          duration: 1000,
          easing: 'easeInExpo',
        },
        opacity: {
          value: [1, 0],
          duration: 3000,
          easing: 'easeInOutQuad',
        },
      }).add({
        targets: '#project-page-container .blackhole-img',
        rotate: {
          value: '6turn',
          duration: 2000,
          easing: 'easeInExpo',
        },
        opacity: {
          value: [1, 0],
          duration: 2000,
          easing: 'easeInExpo',
        },
        offset: -300,
      })
    }

    appearBlackHole()
    console.log(targetImgLeft, targetImgTop, targetIds)
    setTimeout(() => {
      disappearPlanet()
    }, 1800)
    setTimeout(() => {
      this.removeAssignmentData(displayDoms)
      this.props.motionControll()
    }, 2000)
    setTimeout(() => {
      this.props.resetDestroyAction()
      this.props.resetSelectedAssignment()
      targetDom.removeChild(document.getElementsByClassName('blackhole-img')[0])
    }, 5000)
  }

  render() {
    const { icon, actionBtnClass, onClick } = this.props
    return (
      <ActionBtn
        icon={icon}
        actionBtnClass={actionBtnClass}
        onClick={onClick}
      />
    )
  }
}

export default connect(
  ({
    selectedAssignments,
    destroyedAssignments,
    removedAssignments,
    selectedDestroyAction,
    modalOpen,
  }: any) => ({
    selectedAssignments,
    destroyedAssignments,
    removedAssignments,
    selectedDestroyAction,
    modalOpen,
  }),
  {
    setDestroyAction,
    resetDestroyAction,
    resetModalStatus,
    destroyAssignment,
    resetSelectedAssignment,
    setRemovedAssignment,
  }
)(BlackHole)
