import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchRevolvingAssignments,
         createAssignment,
         destroyAssignment } from '../../actions/assignments'
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
      tertiusOrbit: []
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

    nextProps.revolvingAssignments.map((object) => {
      switch (object.orbit_pos) {
        case 'inside':
          primoOrbit.push(object)
          break
        case 'center':
          secundusOrbit.push(object)
          break
        case 'outside':
          tertiusOrbit.push(object)
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

  onDestroyPlanet(assignmentId) {
    this.props.destroyAssignment(assignmentId)
  }

  onMouseOver() {
    //let target_planet = e.target.parentNode

    //const target_planet_size = target_planet.className.split('-')[1]
    //const target_orbit_pos = target_planet.className.split('-')[2]

    //console.log(el)
    //target_planet.appendChild(img_tag)

  }

  addPlanet(e) {
    let target_class = e.target
    let common_planet_tag = document.createElement('div')
    let planet_tag = document.createElement('div')
    let img_tag = document.createElement('img')
    common_planet_tag.className = "common top secundus-orbit-motion start-animation"
    planet_tag.className = "planet-medium-center"
    img_tag.src = PlanetImgs.Uranus

    planet_tag.appendChild(img_tag)
    common_planet_tag.appendChild(planet_tag)
    target_class.appendChild(common_planet_tag)
  }

  addSatelitePlanet() {
    const conditional_class1 = document.getElementsByClassName("secundus-orbit-motion")
    const conditional_class2 = document.getElementsByClassName("tertius-orbit-motion")
    const target_class = document.getElementsByClassName("planet-large-inside")
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

    return(
      <div id="project-orbit">
        <div id="fixed-star" onClick={this.addSatelitePlanet.bind(this)}><img src={PlanetImgs.Uranus} /></div>
        <div className="circle1 common-circle" onClick={this.addPlanet.bind(this)} >
          <Planet orbit={this.state.primoOrbit} />
          <div className="common top primo-orbit-motion start-animation">
            <div className="planet-large-inside" data-value={0} onMouseOver={this.onMouseOver.bind(this)}>
              <img src={PlanetImgs.Earth} />
            </div>
          </div>
        </div>
        <div className="circle2 common-circle" onClick={this.addPlanet.bind(this)} >
          <Planet orbit={this.state.secundusOrbit} />
          <div className="common top secundus-orbit-motion start-animation">
            <div className="planet-medium-center"><img src={PlanetImgs.Jupitar} /></div>
            <div className="satelite-orbit">
              <div className="common top satelite-orbit-motion start-animation">
                <div className="satelite"><img src={PlanetImgs.Love} /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="circle3 common-circle">
          <div className="common right tertius-orbit-motion start-animation">
            <div className="planet-small-outside"><img src={PlanetImgs.Sirius} /></div>
            <div className="satelite-orbit">
              <div className="common top satelite-orbit-motion start-animation">
                <div className="satelite"><img src={PlanetImgs.Ball} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ currentUser, revolvingAssignments }) => ({ currentUser, revolvingAssignments }),
  { fetchRevolvingAssignments, createAssignment, destroyAssignment }
)(ProjectPage)
