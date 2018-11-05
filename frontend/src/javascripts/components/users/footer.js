import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import _ from 'lodash'
import anime from 'animejs'

import ConfirmModal from '../molecules/modal'
import AssignmentForm from '../molecules/assignment-form'

import { nullifySelectedAssignment } from '../../actions/assignments'
import { setSelectedStar, resetSelectedStar, setModalStatus, resetModalStatus } from '../../actions/common'

import ImgHolderOpen from '../../../images/footer/planet_holder_btn.png'
import { PlanetImgs } from '../../constants'
import { RevivalImg } from '../../constants'
import { DeleteIcons } from '../../constants'

class Footer extends Component {
  componentDidMount() {
    let planet_list = document.getElementById("planet-list")
    planet_list.style.display = 'none'
  }

  onClickOpenModal() {
    this.props.setModalStatus(true)
    this.motionControll()
  }

  onClickDestroyPlanets(selectedAssignments) {
    const target_ids = selectedAssignments

    var parent = []
    var canvasEl = []
    var ctx = []

    if(target_ids.length > 0) {
      target_ids.map((id) => {
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
      canvasEl.map((target) => {
        target.style.width = parent[i].parentNode.clientWidth + 'px'
        target.style.height = parent[i].parentNode.clientHeight + 'px'
        target.style.top = `-${parent[i].parentNode.clientWidth/2}px`
        target.style.left = `-${parent[i].parentNode.clientHeight/2}px`
        target.width = parent[i].parentNode.clientWidth
        target.height = parent[i].parentNode.clientHeight
        target.style.zIndex = 500
        target.getContext('2d').scale(2, 2)
        i++
      })
    }

    function updateCoords() {
      pointerX = 100
      pointerY = 100
    }

    function removeImg() {
      parent.map((doc) => {
        const child = doc.children[1]
        doc.removeChild(child)
      })
    }

    function setParticuleDirection(p) {
      var angle = anime.random(0, 360) * Math.PI / 180
      var value = anime.random(50, 180)
      var radius = [-1, 1][anime.random(0, 1)] * value
      return {
        x: p.x + radius * Math.cos(angle),
        y: p.y + radius * Math.sin(angle)
      }
    }

    function createParticule(x,y) {
      let p = {}
      p.x = x
      p.y = y
      p.color = colors[anime.random(0, colors.length - 1)]
      p.radius = anime.random(10, 20)
      p.endPos = setParticuleDirection(p)
      p.draw = function() {
        ctx.map((tar) => {
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
        x: function(p) { return p.endPos.x },
        y: function(p) { return p.endPos.y },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule
      })
    }

    var render = anime({
      duration: Infinity,
      update: function() {
        let i = 0
        ctx.map((val) => {
          val.clearRect(0, 0, canvasEl[i].width, canvasEl[i].height)
          i++
        })
      }
    })

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize, false)
    render.play()
    updateCoords()
    removeImg()
    animateParticules(pointerX, pointerY)
    this.props.nullifySelectedAssignment()
  }

  motionControll() {
    const target_classes = [
      document.getElementsByClassName("primo-orbit-motion"),
      document.getElementsByClassName("secundus-orbit-motion"),
      document.getElementsByClassName("tertius-orbit-motion"),
      document.getElementsByClassName("satelite-orbit-motion")
    ]

    target_classes.map((target) => {
      for(let i=0; i<target.length; i++){
        target[i].classList.toggle("pause-animation")
        target[i].classList.toggle("start-animation")
      }
    })
  }

  onClickOpenPlanetHolder() {
    const target_class = document.getElementsByClassName("open-planet-holder")
    const planet_list = document.getElementById("planet-list")
    //const planet_holder = document.getElementById("planet-holder")

    this.motionControll()

    // メニュー表示/非表示
    if(target_class[0].classList.contains("click-rotate")) {
      target_class[0].classList.remove("click-rotate")
      planet_list.classList.remove("is-show")
      planet_list.style.display = 'none'
      //planet_holder.classList.remove('holder-border');
    } else {
      target_class[0].classList.add("click-rotate")
      planet_list.classList.add("is-show")
      planet_list.style.display = ''
      planet_list.style.width = '400px'
      //planet_holder.classList.add('holder-border');
    }

    const target = document.getElementById('form-balloon')
    target.style.display = 'none'
  }

  onClickSelectStar(star_type) {
    const target = document.getElementById('form-balloon')

    this.props.setSelectedStar(star_type)
    target.style.display = 'block'
  }

  renderPlanetList() {
    return(
      _.map(PlanetImgs, (src_path, key) => {
        return(
          <li
            key={key}
            className="planet"
            onClick={this.onClickSelectStar.bind(this, key)}>
              <img src={src_path} className="planet-img"/>
          </li>
        )
      })
    )
  }

  renderDeleteIcons(deleteButtonsclasses) {
    return DeleteIcons.map(deleteIcon => {
      return (
        <li key={deleteIcon} className={deleteButtonsclasses} onClick={this.onClickOpenModal.bind(this)}>
          <img src={deleteIcon} className="delete-btn"/>
        </li>
      )
    })
  }

  render() {
    const { currentUser, location: { pathname } } = this.props
    const rootPath = `/users/${currentUser.id}`

    const planetHolderClasses = classNames({
      'open-planet-holder': true,
      'holder-show': pathname === `${rootPath}` || /^\/users\/[1-9]\d*\/projects$/.test(pathname)
    })
    const revivalButtonClasses = classNames({
      'disapperance': true,
      'revival-button-show': pathname === `${rootPath}/history`
    })
    const deleteButtonsclasses = classNames({
      'disapperance': true,
      'delete-buttons-show': pathname === `${rootPath}` || /^\/users\/[1-9]\d*\/projects$/.test(pathname) || pathname === `${rootPath}/history`
    })

    return(
      <div id="footer">
        <div id="planet-holder">
          <div className={planetHolderClasses} onClick={this.onClickOpenPlanetHolder.bind(this)}>
            <img src={ImgHolderOpen} className="planet-holder-img"/>
          </div>
          <AssignmentForm />
          <ul id="planet-list">
            {this.renderPlanetList()}
          </ul>
        </div>
        <div id="disapperance-holder">
          <ul className="disapperance-list">
            <li className={revivalButtonClasses}><img src={RevivalImg} className="delete-btn"/></li>
            {this.renderDeleteIcons(deleteButtonsclasses)}
          </ul>
        </div>
        <ConfirmModal parentMethod={this.onClickDestroyPlanets} />
      </div>
    )
  }
}

export default connect(
  ({ currentUser, selectedAssignments, selectedStar, modalIsOpen }) => ({ currentUser, selectedAssignments, selectedStar, modalIsOpen }),
  { nullifySelectedAssignment, setSelectedStar, resetSelectedStar, setModalStatus, resetModalStatus }
)(Footer)
