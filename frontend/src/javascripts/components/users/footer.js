import React, { Component } from 'react'
import { connect } from 'react-redux'
import anime from 'animejs'

import ConfirmModal from '../molecules/modal'

import { nullifySelectedAssignment } from '../../actions/assignments'
import { setModalStatus, resetModalStatus } from '../../actions/common'

import ImgHolderOpen from '../../../images/footer/planet_holder_btn.png'
import { PlanetImgs } from '../../constants'
import { DeleteIcons } from '../../constants'

class Footer extends Component {
  componentDidMount() {
    let planet_list = document.getElementById("planet-list")
    planet_list.style.display = 'none'
  }

  onClickOpenModal() {
    this.props.setModalStatus(true)
  }

  onClickDestroyPlanets(e) {
    const target_ids = this.props.selectedAssignments

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
      console.log(parent[0])
    }

    const numberOfParticules = 80
    //const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']
    const colors = ['#FFF', '#FFF', '#FFF', '#FFF']

    var pointerX = 0
    var pointerY = 0

    function setCanvasSize() {
      var i = 0
      canvasEl.map((target) => {
        target.style.display = ''
        target.width = parent[i].clientWidth
        target.height = parent[i].clientHeight
        target.style.zIndex = 500
        target.getContext('2d').scale(2, 2)
        i++
      })
    }

    function updateCoords(e) {
      pointerX = 50
      pointerY = 50
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
  }

  renderPlanetList() {
    //FIXME: もっといい方法ないか
    let list = []
    for(let key in PlanetImgs) {
        list.push(<li key={key} className="planet" draggable="true"><img src={PlanetImgs[key]} className="planet-img"/></li>)
    }
    return(list)
  }

  // TODO: footer の実際の細かい動き（planetholder＆destroyの設定）
  render() {
    return(
      <div id="footer">
        <div id="planet-holder">
          <div className="open-planet-holder" onClick={this.onClickOpenPlanetHolder.bind(this)}>
            <img src={ImgHolderOpen} className="planet-holder-img"/>
          </div>
          <ul id="planet-list">
            {this.renderPlanetList()}
          </ul>
        </div>
        <div id="disapperance-holder">
          <ul id="disapperance-list">
            { DeleteIcons.map((deleteIcon) => {
              return (
                <li key={deleteIcon} className="disapperance" onClick={this.onClickOpenModal.bind(this)}>
                  <img src={deleteIcon} className="delete-btn"/>
                </li>
              )
            }) }
          </ul>
        </div>
        <ConfirmModal parentMethod={this.onClickDestroyPlanets}/>
      </div>
    )
  }
}

export default connect(
  ({selectedAssignments, modalIsOpen}) => ({selectedAssignments, modalIsOpen}),
  { nullifySelectedAssignment, setModalStatus, resetModalStatus }
)(Footer)
