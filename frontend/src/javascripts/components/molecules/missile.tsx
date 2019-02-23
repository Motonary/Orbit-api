import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import anime from 'animejs'
import Alert from 'react-s-alert'

import ActionBtn from '../atoms/buttons/action-btn'

import { resetDestroyAction, resetModalStatus } from '../../actions/common'
import { destroyAssignment, resetSelectedAssignment } from '../../actions/assignments'
import { destroyProject, resetSelectedProject } from '../../actions/projects'

import { DeleteActions } from '../../constants/images'

interface MissleProps {
  icon: string
  actionBtnClass: string
  history: any
  currentUser: any
  motionControll: () => void
  onClick: () => void

  selectedAssignments: any
  destroyedAssignments: any
  selectedDestroyAction: any
  modalOpen: any
  selectedProject: any

  resetDestroyAction: any
  resetModalStatus: any
  destroyAssignment: any
  resetSelectedAssignment: any
  destroyProject: any
  resetSelectedProject: any
}

class Missle extends React.Component<MissleProps, {}> {
  componentDidUpdate(/*prevProps, prevState*/) {
    const { selectedAssignments, selectedProject, modalOpen, selectedDestroyAction } = this.props
    if (selectedAssignments.length === 0 && selectedProject.length === 0) return
    if (modalOpen !== '') return
    if (selectedDestroyAction !== 'Missile') return
    this.onIgniteDestroyAnimation()
  }

  onIgniteDestroyAnimation() {
    const targetDom: any = document.getElementById('project-page-container')
    const insertDom: any = document.getElementById('project-container')
    const actionType: any = this.props.selectedDestroyAction
    let newDiv: any = document.createElement('div')
    let newImg: any = document.createElement('img')
    newDiv.classList.add('destroy-action')
    newImg.src = DeleteActions[actionType]
    newDiv.appendChild(newImg)
    targetDom.insertBefore(newDiv, insertDom)
    this.makeMovement(newDiv)
  }

  makeMovement(targetDiv: any) {
    const { selectedAssignments, selectedProject } = this.props
    const movDom: any = targetDiv
    const targetIdName =
      selectedAssignments.length !== 0
        ? `planet-${selectedAssignments[0]}`
        : `project-${selectedProject[0]}`
    const targetDom: any = document.getElementById(targetIdName) // should be div.id="planet-2-Earth" class="planet-medium-secundus"
    if (!targetDom) {
      this.showErrorFlash('Sorry, something went wrong. Please reload and try again...')
      return
    }

    // 要素の位置座標を取得.
    const clientRectMov: any = movDom.getBoundingClientRect()
    const clientRectTarget: any = targetDom.getBoundingClientRect()

    // 要素の大きさを取得
    const TargetWidth: number = targetDom.clientWidth
    const TargetHeight: number = targetDom.clientHeight

    // 画面の左端から、要素の左端までの距離
    const xM: number = clientRectMov.left
    const xT: number = clientRectTarget.left
    // 画面の上端から、要素の上端までの距離
    const yM: number = clientRectMov.top
    const yT: number = clientRectTarget.top

    // 目標惑星中心までの距離(px)とArctanへの引数
    let disX: number = xT - xM
    const disY: number = yT - yM
    let arcvalue: number
    if (disX < 0) {
      arcvalue = -disY / disX
    } else {
      arcvalue = disY / disX
    }

    const deg: number = (Math.atan(arcvalue) * 180) / Math.PI - 4

    const MissileTransforms = anime({
      targets: '#project-page-container .destroy-action',
      rotate: {
        value: -deg,
        duration: 1000,
        easing: 'easeInQuart',
      },
      translateX: {
        value: disX - TargetWidth,
        duration: 1780,
        easing: 'easeInExpo',
        delay: 500,
      },
      traslateY: {
        value: disY + TargetHeight,
        duration: 1780,
        easing: 'easeInExpo',
        delay: 500,
      },
    })

    setTimeout(() => {
      this.destroyPlanets(selectedProject.length !== 0 ? selectedProject : selectedAssignments)
    }, 2450)
  }

  showSuccessFlash(successMessage: string) {
    Alert.success(successMessage, {
      position: 'top-right',
      effect: 'jelly',
      timeout: 3000,
      offset: 80,
    })
  }

  showErrorFlash(errorMessage: string) {
    Alert.error(errorMessage, {
      position: 'top-right',
      effect: 'jelly',
      timeout: 3000,
      offset: 80,
    })
  }

  // 削除されたAssignmentIdをcanvasのidから特定し、destroyedAssignmentsに格納
  removeAssignmentData(parent: any) {
    _.forEach(parent, (destroyDom: any) => {
      const destroyedCvs: any = destroyDom.children[1]
      const destroyedAssignmentId: string = destroyedCvs.id.split('-')[0]
      this.props.destroyAssignment(destroyedAssignmentId)
    })
  }
  // 削除されたProjectIdをcanvasのidから特定し、destroyedProjectに格納
  removeProjectData(destroyDom: any) {
    const destroyedCvs: any = destroyDom[0].firstChild
    const destroyedProjectId: string = destroyedCvs.id.split('-')[0]
    this.props
      .destroyProject(destroyedProjectId)
      .then(() => {
        this.showSuccessFlash('Successfully destroyed. Moving to mypage...')
        setTimeout(() => {
          this.props.history.push(`/users/${this.props.currentUser.id}`)
        }, 3000)
      })
      .catch(() =>
        this.showErrorFlash('Sorry, something went wrong. Please reload and try again...')
      )
  }

  destroyPlanets(selectedPlanetIds: any) {
    const target_ids: any = selectedPlanetIds
    const isProject: boolean = this.props.selectedProject.length !== 0

    const parent: any = []
    const canvasEl: any = []
    const ctx: any = []

    if (target_ids.length > 0) {
      target_ids.forEach((id: string) => {
        const tar: any = document.getElementById(id)
        parent.push(tar.parentNode)
        canvasEl.push(tar)
        ctx.push(tar.getContext('2d'))
      })
    }

    const numberOfParticules: number = 70
    const colors: string[] = ['#FFF', '#FFF', '#FFF', '#FFF']

    let pointerX: number = 0
    let pointerY: number = 0

    function setCanvasSize() {
      if (isProject) {
        const target = canvasEl[0]
        target.style.width = '100vw'
        target.style.height = '100vh'
        target.width = 1000
        target.height = 600
        target.style.zIndex = 500
        target.getContext('2d').scale(2, 2)
      } else {
        canvasEl.forEach((target: any, i: number) => {
          target.style.width = parent[i].parentNode.clientWidth + 'px'
          target.style.height = parent[i].parentNode.clientHeight + 'px'
          target.style.top = `-${parent[i].parentNode.clientWidth / 2}px`
          target.style.left = `-${parent[i].parentNode.clientHeight / 2}px`
          target.width = parent[i].parentNode.clientWidth
          target.height = parent[i].parentNode.clientHeight
          target.style.zIndex = 500
          target.getContext('2d').scale(2, 2)
        })
      }
    }

    function updateCoords() {
      if (isProject) {
        pointerX = 300
        pointerY = 150
      } else {
        pointerX = 60
        pointerY = 60
      }
    }

    function removeImg() {
      _.forEach(parent, (doc: any) => {
        const child: any = isProject ? doc.children[0] : doc.children[1]
        if (!isProject) {
          if (child.classList.contains('warning-animation')) {
            child.classList.remove('warning-animation')
          }
        }
        doc.removeChild(child)
      })
    }

    function removeDestroyImg() {
      const targetDom: any = document.getElementById('project-page-container')
      const movDom: any = document.getElementsByClassName('destroy-action')[0]

      targetDom.removeChild(movDom)
    }

    function setParticuleDirection(p: any) {
      const angle: any = (anime.random(0, 360) * Math.PI) / 180
      const value: any = anime.random(50, 180)
      const radius: any = [-1, 1][anime.random(0, 1)] * value
      return {
        x: p.x + radius * Math.cos(angle),
        y: p.y + radius * Math.sin(angle),
      }
    }

    function createParticule(x: number, y: number) {
      let p: any = {}
      p.x = x
      p.y = y
      p.color = colors[anime.random(0, colors.length - 1)]
      p.radius = anime.random(10, 20)
      p.endPos = setParticuleDirection(p)
      p.draw = function() {
        ctx.forEach((tar: any) => {
          tar.beginPath()
          tar.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
          tar.fillStyle = p.color
          tar.fill()
        })
      }
      return p
    }

    function renderParticule(anim: any) {
      for (let i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw()
      }
    }

    function animateParticules(x: number, y: number) {
      const particules = []
      for (let i = 0; i < numberOfParticules; i++) {
        particules.push(createParticule(x, y))
      }
      anime.timeline().add({
        targets: particules,
        x: function(p: any) {
          return p.endPos.x
        },
        y: function(p: any) {
          return p.endPos.y
        },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
      })
    }

    function clear() {
      ctx.forEach((val: any, i: number) => {
        val.clearRect(0, 0, canvasEl[i].width, canvasEl[i].height)
      })
    }

    const render: anime.AnimeInstance = anime({
      targets: null,
      duration: Infinity,
      update: clear,
    })

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize, false)
    render.play()
    updateCoords()
    removeImg()
    removeDestroyImg()
    animateParticules(pointerX, pointerY)
    this.props.resetDestroyAction()
    this.props.resetSelectedAssignment()
    this.props.resetSelectedProject()
    this.props.motionControll()
    if (isProject) {
      this.removeProjectData(parent)
    } else {
      this.removeAssignmentData(parent)
    }
  }

  render() {
    const { icon, actionBtnClass, onClick } = this.props
    return <ActionBtn icon={icon} actionBtnClass={actionBtnClass} onClick={onClick} />
  }
}

export default connect(
  ({
    selectedAssignments,
    destroyedAssignments,
    selectedDestroyAction,
    modalOpen,
    selectedProject,
  }: any) => ({
    selectedAssignments,
    destroyedAssignments,
    selectedDestroyAction,
    modalOpen,
    selectedProject,
  }),
  {
    resetDestroyAction,
    resetModalStatus,
    destroyAssignment,
    resetSelectedAssignment,
    destroyProject,
    resetSelectedProject,
  }
)(Missle)
