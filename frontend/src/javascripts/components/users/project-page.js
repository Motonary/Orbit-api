import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchRevolvingAssignments,
         createAssignment,
         destroyAssignment } from '../../actions/assignments'
import anime from 'animejs'

import { PlanetImgs } from '../../constants'
import Planet from '../molecules/planet'

class ProjectPage extends Component {
  constructor(props) {
    super(props)
    // DRYにするためstateで定義
    this.state = {
      userId: props.match.params.userId,
      projectId: props.match.params.projectId,
      primoOrbit: [],
      secundusOrbit: [],
      tertiusOrbit: [],
      selectedPlanet: []
    }
  }

  componentDidMount() {
    this.props.fetchRevolvingAssignments(this.state.projectId)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //FIXME: this.stateを総取っ替えしてるから変更箇所だけ挿入みたいにしたいが、これしかない？
    const primoOrbit = []
    const secundusOrbit = []
    const tertiusOrbit = []

    nextProps.revolvingAssignments.map((assignment) => {
      switch (assignment.orbit_pos) {
        case 'primo':
          primoOrbit.push(assignment)
          break
        case 'secundus':
          secundusOrbit.push(assignment)
          break
        case 'tertius':
          tertiusOrbit.push(assignment)
          break
      }
    })
    this.setState({primoOrbit, secundusOrbit, tertiusOrbit})
  }

  onClickPlanet() {
    // TODO: タスク詳細のポップアップ実装,
  }

  onDropPlanet(title, detail, deadline, planet_type, planet_size, orbit_pos) {
    this.props.createAssignment(
      title, detail, deadline, planet_type, planet_size, orbit_pos, this.state.projectId
    )
  }

  onClickDestroyPlanets(e) {
    const target_id = this.state.selectedPlanet

    var parent = []
    var canvasEl = []
    var ctx = []

    target_id.map((id_name) => {
      let tar = document.getElementById(id_name)
      parent.push(tar.parentNode)
      canvasEl.push(tar)
      ctx.push(tar.getContext('2d'))
    })
    console.log(parent[0].clientHeight)

    const numberOfParticules = 100
    const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']

    var pointerX = 0
    var pointerY = 0
    var tap = 'mousedown'

    //const colors = ['#FFF', '#FFF', '#FFF', '#FFF']

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
        console.log(doc.firstElementChild.firstElementChild)
        let child = doc.firstElementChild.firstElementChild
        doc.firstElementChild.removeChild(child)
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
      var p = {}
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
      for (var i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw()
      }
    }

    function animateParticules(x, y) {
      var particules = []
      for (var i = 0; i < numberOfParticules; i++) {
        particules.push(createParticule(x, y))
      }
      anime.timeline().add({
        targets: particules,
        x: function(p) { return p.endPos.x; },
        y: function(p) { return p.endPos.y; },
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

    //var centerX = window.innerWidth / 2;
    //var centerY = window.innerHeight / 2;

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize, false)
    render.play()
    updateCoords()
    removeImg()
    animateParticules(pointerX, pointerY)
  }

  onSelected(e) {
    const target = e.target.parentNode.nextElementSibling

    let selectedPlanet = this.state.selectedPlanet

    selectedPlanet.push(target.id)

    this.setState(selectedPlanet)

    console.log(this.state.selectedPlanet)
  }

  onDestroyPlanet(assignmentId) {
    this.props.destroyAssignment(assignmentId)
  }

  addPlanet(e) {
    let target_class = e.target
    let common_planet_tag = document.createElement('div')
    let planet_tag = document.createElement('div')
    let img_tag = document.createElement('img')
    common_planet_tag.className = "common top secundus-orbit-motion start-animation"
    planet_tag.className = "planet-medium-secundus"
    img_tag.src = PlanetImgs.Uranus

    planet_tag.appendChild(img_tag)
    common_planet_tag.appendChild(planet_tag)
    target_class.appendChild(common_planet_tag)
  }

  addSatelitePlanet() {
    const conditional_class1 = document.getElementsByClassName("secundus-orbit-motion")
    const conditional_class2 = document.getElementsByClassName("tertius-orbit-motion")
    const target_class = document.getElementsByClassName("planet-large-primo")
    const target_width = 1.5 * target_class[0].getBoundingClientRect().width

    if(conditional_class1[0].children[1].classList.contains("satelite-orbit")){
      conditional_class1[0].children[1].style.width = target_width + "px"
      conditional_class1[0].children[1].style.height = target_width + "px"
      conditional_class2[0].children[1].style.width = target_width + "px"
      conditional_class2[0].children[1].style.height = target_width + "px"
    }
  }

  render() {
    const { currentUser } = this.props
    if (!currentUser) {
      return <div>Loading....</div>
    }

    if (currentUser.id != this.state.userId) {
      const correctPath = `/users/${currentUser.id}`
      return <Redirect to={correctPath} />
    }

    console.log(this.state.primoOrbit)

    return(
      <div id="project-orbit">
        <div id="fixed-star" onClick={this.addSatelitePlanet.bind(this)}><img src={PlanetImgs.Uranus} /></div>
        <div className="circle1 common-circle" onClick={this.addPlanet.bind(this)} >
          <Planet orbit='primo' />
          <div className="common top primo-orbit-motion start-animation" >
            <div className="planet-large-primo" onClick={this.onSelected.bind(this)}>
              <img src={PlanetImgs.Earth} />
            </div>
            <canvas id="momomomo" className="canvas"></canvas>
          </div>
        </div>
        <div className="circle2 common-circle" onClick={this.addPlanet.bind(this)} >
          <div className="common top secundus-orbit-motion start-animation">
            <div className="planet-medium-secundus"><img src={PlanetImgs.Jupitar} /></div>
          </div>
        </div>
        <div className="circle3 common-circle">
          <div className="common right tertius-orbit-motion start-animation">
            <div className="planet-small-tertius"><img src={PlanetImgs.Sirius} /></div>
          </div>
        </div>
        <div onClick={this.onClickDestroyPlanets.bind(this)}>YOOOO</div>
      </div>
    )
  }
}

export default connect(
  ({ currentUser, revolvingAssignments }) => ({ currentUser, revolvingAssignments }),
  { fetchRevolvingAssignments, createAssignment, destroyAssignment }
)(ProjectPage)
