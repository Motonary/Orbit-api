import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import anime from 'animejs'

import ActionBtn from '../atoms/buttons/action-btn'

import { setDestroyAction, resetDestroyAction, resetModalStatus } from '../../actions/common'
import { destroyAssignment, resetSelectedAssignment } from '../../actions/assignments'

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

  setDestroyAction: any
  resetDestroyAction: any
  resetModalStatus: any
  destroyAssignment: any
  resetSelectedAssignment: any
}

class BlackHole extends React.Component<BlackHoleProps, {}> {
  componentDidUpdate(/*prevProps, prevState*/) {
    if (this.props.selectedAssignments.length === 0) return
    if (this.props.modalOpen !== '') return
    if (this.props.selectedDestroyAction !== 'BlackHole') return
    this.iginiteBlackHoleAnimation()
  }

  // 削除されたAssignmentIdをcanvasのidから特定し、destroyedAssignmentsに格納
  removeAssignmentData(parent: any) {
    _.forEach(parent, (destroyDom: any) => {
      let destroyedAssignmentId: string = destroyDom.id.split('-')[1] // <div #planet-2-Mras />
      this.props.destroyAssignment(destroyedAssignmentId)
    })
  }

  iginiteBlackHoleAnimation() {
    const targetIds: string[] = this.props.selectedAssignments
    const actionType: string = this.props.selectedDestroyAction
    const targetDom: HTMLElement = document.getElementById('project-page-container')
    const insertDom: HTMLElement = document.getElementById('project-container')
    const displayDoms: any = []
    let targetImgTop: number = 0
    let targetImgLeft: number = 0

    targetIds.forEach((id: string) => {
      displayDoms.push(document.getElementById(`planet-${id}`)) // planet-2-Earth <Plant />の親要素
    })

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
    }

    function disappearPlanet() {
      const clientRectPlanet: any = displayDoms[0].getBoundingClientRect()
      const planetImgTop: number = clientRectPlanet.top
      const planetImgLeft: number = clientRectPlanet.left
      const BlackHoleAnimation = anime.timeline()
      BlackHoleAnimation.add({
        targets: `#planet-${targetIds[0]} .planet-img-container`,
        translateX: {
          value: targetImgLeft - planetImgLeft,
          duration: 1000,
          easing: 'easeInExpo',
        },
        translateY: {
          value: targetImgTop - planetImgTop,
          duration: 1000,
          easing: 'easeInExpo',
        },
        opacity: {
          value: [1, 0],
          duration: 1200,
          easing: 'easeInQuad',
        },
      }).add({
        targets: '#project-page-container .blackhole-img',
        rotate: {
          value: '6turn',
          duration: 1800,
          easing: 'easeInExpo',
        },
        opacity: {
          value: [1, 0],
          duration: 1800,
          easing: 'easeInExpo',
        },
        offset: -300,
      })
    }

    appearBlackHole()
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
    return <ActionBtn icon={icon} actionBtnClass={actionBtnClass} onClick={onClick} />
  }
}

export default connect(
  ({ selectedAssignments, destroyedAssignments, selectedDestroyAction, modalOpen }: any) => ({
    selectedAssignments,
    destroyedAssignments,
    selectedDestroyAction,
    modalOpen,
  }),
  {
    setDestroyAction,
    resetDestroyAction,
    resetModalStatus,
    destroyAssignment,
    resetSelectedAssignment,
  }
)(BlackHole)
