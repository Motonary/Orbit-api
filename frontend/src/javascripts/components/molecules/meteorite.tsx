import * as React from 'react'
import { connect } from 'react-redux'
import anime from 'animejs'

import DeleteBtn from '../atoms/buttons/delete-btn'

import { resetDestroyAction, resetModalStatus } from '../../actions/common'
import { resetSelectedAssignment } from '../../actions/assignments'

import { DeleteActions } from '../../constants/images'

interface MeteoriteProps {
  icon: string
  deleteBtnClass: string
  motionControll: () => void
  onClick: () => void

  selectedAssignments: any
  destroyedAssignments: any
  selectedDestroyAction: any
  modalOpen: any

  resetDestroyAction: any
  resetModalStatus: any
  resetSelectedAssignment: any
}

class Meteorite extends React.Component<MeteoriteProps, {}> {
  componentDidUpdate(/*prevProps, prevState*/) {
    const selected = this.props.selectedAssignments && !this.props.modalOpen
    if (selected && this.props.selectedDestroyAction === 'Missle') {
      this.onIgniteDestroyAnimation()
    }
  }

  onIgniteDestroyAnimation() {
    const targetDom: any = document.getElementById('project-orbit')
    const insertDom: any = document.getElementById('fixed-star')
    const actionKey: any = this.props.selectedDestroyAction
    let newDiv: any = document.createElement('div')
    let newImg: any = document.createElement('img')
    newDiv.classList.add('destroy-action')
    newImg.src = DeleteActions[actionKey]
    newDiv.appendChild(newImg)
    targetDom.insertBefore(newDiv, insertDom)
    this.makeMovement()
  }

  makeMovement() {
    const movDom: any = document.getElementsByClassName('destroy-action')[0]
    let targetDom: any
    if (this.props.selectedAssignments) {
      targetDom = document.getElementById(this.props.selectedAssignments[0])
    }

    // 要素の位置座標を取得.
    const clientRectMov: any = movDom.getBoundingClientRect()
    const clientRectTarget: any = targetDom.getBoundingClientRect()

    // 画面の左端から、要素の左端までの距離
    const xM: number = clientRectMov.left
    const xT: number = clientRectTarget.left
    // 画面の上端から、要素の上端までの距離
    const yM: number = clientRectMov.top
    const yT: number = clientRectTarget.top

    // 要素までの距離(px)とArctanへの引数
    const disX: number = xT - xM
    const disY: number = yT - yM
    const arcvalue: number = disY / disX

    // Arctanのマクローリン展開（４次近似）により、arctanの整数値から目標物への角度を求める
    const args: number =
      arcvalue -
      Math.pow(arcvalue, 3) / 3 +
      Math.pow(arcvalue, 5) / 5 -
      Math.pow(arcvalue, 7) / 7

    movDom.classList.add('move-animation')
    movDom.style.tranform = `rotate(-${args}deg)`
    movDom.style.transform = `translateX(${disX}px) translateY(${disY}px)`

    setTimeout(() => {
      this.destroyPlanets(this.props.selectedAssignments)
    }, 2500)
  }

  removePlanet(parent: any) {
    // FIXME: 一旦canvas以外のImgとballoonを削除・DOM上にはPlanetを表示する親要素は残る
    parent.map((doc: any) => {
      let parent: any = doc
      let child: any = doc.firstChild
      parent.removeChild(child)
    })
  }

  removeAssignmentData(parent: any) {
    parent.map((doc: any) => {
      let cvs: any = doc.children[1]
      let cvs_info: any = cvs.id.split('-')
      this.props.destroyedAssignments(cvs_info[0])
    })
  }

  destroyPlanets(selectedAssignments: any) {
    const target_ids: any = selectedAssignments

    let parent: any = []
    let canvasEl: any = []
    let ctx: any = []

    if (target_ids.length > 0) {
      target_ids.map((id: string) => {
        let tar: any = document.getElementById(id)
        parent.push(tar.parentNode)
        canvasEl.push(tar)
        ctx.push(tar.getContext('2d'))
      })
    }

    const numberOfParticules: number = 80
    const colors: string[] = ['#FFF', '#FFF', '#FFF', '#FFF']

    let pointerX: number = 0
    let pointerY: number = 0

    // console.log(parent, canvasEl, ctx)

    function setCanvasSize() {
      let i: number = 0
      canvasEl.map((target: any) => {
        target.style.width = parent[i].parentNode.clientWidth + 'px'
        target.style.height = parent[i].parentNode.clientHeight + 'px'
        target.style.top = `-${parent[i].parentNode.clientWidth / 2}px`
        target.style.left = `-${parent[i].parentNode.clientHeight / 2}px`
        target.width = parent[i].parentNode.clientWidth
        target.height = parent[i].parentNode.clientHeight
        target.style.zIndex = 500
        target.getContext('2d').scale(2, 2)
        i++
      })
    }

    function updateCoords() {
      pointerX = 60
      pointerY = 60
    }

    function removeImg() {
      parent.map((doc: any) => {
        const child: any = doc.children[1]
        doc.removeChild(child)
      })
    }

    function removeDestroyImg() {
      const targetDom: any = document.getElementById('project-orbit')
      const movDom: any = document.getElementsByClassName('destroy-action')[0]

      targetDom.removeChild(movDom)
    }

    function setParticuleDirection(p: any) {
      let angle: any = (anime.random(0, 360) * Math.PI) / 180
      let value: any = anime.random(50, 180)
      let radius: any = [-1, 1][anime.random(0, 1)] * value
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
        ctx.map((tar: any) => {
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
      let particules: any = []
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
      let i: number = 0
      ctx.map((val: any) => {
        val.clearRect(0, 0, canvasEl[i].width, canvasEl[i].height)
        i++
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
    this.props.resetDestroyAction(null)
    this.removeAssignmentData(parent)
    this.removePlanet(parent)
    this.props.resetSelectedAssignment()
    this.props.motionControll()
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
    resetDestroyAction,
    resetModalStatus,
    resetSelectedAssignment,
  }
)(Meteorite)
