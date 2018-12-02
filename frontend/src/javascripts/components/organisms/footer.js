import React, { Component } from 'react'
import { connect } from 'react-redux'
import anime from 'animejs'

import PlanetHolder from '../molecules/planet-holder'
import FooterButtonsList from '../molecules/footer-buttons-list'
import ConfirmModal from '../molecules/modal'
import {
  destroyAssignment,
  nullifySelectedAssignment,
} from '../../actions/assignments'
import {
  setSelectedStar,
  resetSelectedStar,
  resetDestroyPlanets,
} from '../../actions/common'

import { DeleteActions } from '../../constants/images'

import '../../../stylesheets/destroy_animate.scss'

class Footer extends Component {
  componentDidMount() {
    let planet_list = document.getElementById('planet-list')
    planet_list.style.display = 'none'
  }

  componentDidUpdate(/*prevProps, prevState*/) {
    // TODO: 星破壊時の諸関数も最適化ししかるべきコンポーネントに移動する
    if (this.props.isDestroyIgnited && !this.props.modalIsOpen) {
      if (this.props.selectedAssignments) {
        this.onIgniteDestroyAnimation()
      }
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
    const actionKey = this.props.isDestroyIgnited
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

  onClickDestroyPlanets(selectedAssignments) {
    const target_ids = selectedAssignments

    var parent = []
    var canvasEl = []
    var ctx = []

    if (target_ids.length > 0) {
      target_ids.map(id => {
        let tar = document.getElementById(id)
        parent.push(tar.parentNode)
        canvasEl.push(tar)
        ctx.push(tar.getContext('2d'))
      })
    }

    const numberOfParticules = 80
    //const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']
    const colors = ['#FFF', '#FFF', '#FFF', '#FFF']

    var pointerX = 0
    var pointerY = 0

    //console.log(parent, canvasEl, ctx)

    function setCanvasSize() {
      let i = 0
      canvasEl.map(target => {
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
      parent.map(doc => {
        const child = doc.children[1]
        doc.removeChild(child)
      })
    }

    function removeDestroyImg() {
      const targetDom = document.getElementById('project-orbit')
      const movDom = document.getElementsByClassName('destroy-action')[0]

      targetDom.removeChild(movDom)
    }

    function setParticuleDirection(p) {
      var angle = (anime.random(0, 360) * Math.PI) / 180
      var value = anime.random(50, 180)
      var radius = [-1, 1][anime.random(0, 1)] * value
      return {
        x: p.x + radius * Math.cos(angle),
        y: p.y + radius * Math.sin(angle),
      }
    }

    function createParticule(x, y) {
      let p = {}
      p.x = x
      p.y = y
      p.color = colors[anime.random(0, colors.length - 1)]
      p.radius = anime.random(10, 20)
      p.endPos = setParticuleDirection(p)
      p.draw = function() {
        ctx.map(tar => {
          tar.beginPath()
          tar.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
          tar.fillStyle = p.color
          tar.fill()
        })
      }
      return p
    }

    function renderParticule(anim) {
      for (let i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw()
      }
    }

    function animateParticules(x, y) {
      var particules = []
      for (let i = 0; i < numberOfParticules; i++) {
        particules.push(createParticule(x, y))
      }
      anime.timeline().add({
        targets: particules,
        x: function(p) {
          return p.endPos.x
        },
        y: function(p) {
          return p.endPos.y
        },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
      })
    }

    var render = anime({
      duration: Infinity,
      update: function() {
        let i = 0
        ctx.map(val => {
          val.clearRect(0, 0, canvasEl[i].width, canvasEl[i].height)
          i++
        })
      },
    })

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize, false)
    render.play()
    updateCoords()
    removeImg()
    removeDestroyImg()
    animateParticules(pointerX, pointerY)
    this.props.resetDestroyPlanets(null)
    this.removeAssignmentData(parent)
    this.removePlanet(parent)
    this.props.nullifySelectedAssignment()
    this.motionControll()
  }

  motionControll() {
    const target_classes = [
      document.getElementsByClassName('primo-orbit-motion'),
      document.getElementsByClassName('secundus-orbit-motion'),
      document.getElementsByClassName('tertius-orbit-motion'),
      document.getElementsByClassName('satelite-orbit-motion'),
    ]

    target_classes.map(target => {
      for (let i = 0; i < target.length; i++) {
        target[i].classList.toggle('pause-animation')
        target[i].classList.toggle('start-animation')
      }
    })
  }

  render() {
    const { currentUser, pathname } = this.props
    const rootPath = `/users/${currentUser.id}`

    return (
      <div id="footer">
        <PlanetHolder pathname={pathname} currentUser={currentUser} />
        <FooterButtonsList pathname={pathname} rootPath={rootPath} />
        <ConfirmModal />
      </div>
    )
  }
}

export default connect(
  ({
    currentUser,
    selectedAssignments,
    selectedStar,
    isDestroyIgnited,
    modalIsOpen,
  }) => ({
    currentUser,
    selectedAssignments,
    isDestroyIgnited,
    selectedStar,
    modalIsOpen,
  }),
  {
    destroyAssignment,
    nullifySelectedAssignment,
    setSelectedStar,
    resetSelectedStar,
    resetDestroyPlanets,
  }
)(Footer)
