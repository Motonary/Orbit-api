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
      firstOrbit: [],
      secondOrbit: [],
      thirdOrbit: []
    }
  }

  componentDidMount() {
    this.props.fetchRevolvingAssignments(this.state.projectId)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //FIXME: this.stateを総取っ替えしてるから変更箇所だけ挿入みたいにしたいが、これしかない？
    const firstOrbit = []
    const secondOrbit = []
    const thirdOrbit = []

    nextProps.revolvingAssignments.map((object) => {
      switch (object.orbit_pos) {
        case 'inside':
          firstOrbit.push(object)
          break
        case 'center':
          secondOrbit.push(object)
          break
        case 'outside':
          thirdOrbit.push(object)
          break
      }
    })
    this.setState({firstOrbit, secondOrbit, thirdOrbit})
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
    common_planet_tag.className = "common top second-orbit-motion start-animation"
    planet_tag.className = "planet-medium-center"
    img_tag.src = PlanetImgs[1]

    planet_tag.appendChild(img_tag)
    common_planet_tag.appendChild(planet_tag)
    target_class.appendChild(common_planet_tag)
  }

  addSatelitePlanet() {
    const conditional_class1 = document.getElementsByClassName("second-orbit-motion")
    const conditional_class2 = document.getElementsByClassName("third-orbit-motion")
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
        <div id="fixed-star" onClick={this.addSatelitePlanet.bind(this)}><img src={PlanetImgs[0]} /></div>
        <div className="circle1 common-circle" onClick={this.addPlanet.bind(this)} >
          <Planet orbit={this.state.firstOrbit} />
          <div className="common top first-orbit-motion start-animation">
            <div className="planet-large-inside" data-value={0} onMouseOver={this.onMouseOver.bind(this)}>
              <img src={PlanetImgs[5]} />
            </div>
          </div>
        </div>
        <div className="circle2 common-circle" onClick={this.addPlanet.bind(this)} >
          <Planet orbit={this.state.secondOrbit} />
          <div className="common top second-orbit-motion start-animation">
            <div className="planet-medium-center"><img src={PlanetImgs[7]} /></div>
            <div className="satelite-orbit">
              <div className="common top satelite-orbit-motion start-animation">
                <div className="satelite"><img src={PlanetImgs[13]} /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="circle3 common-circle">
          <div className="common right third-orbit-motion start-animation">
            <div className="planet-small-outside"><img src={PlanetImgs[10]} /></div>
            <div className="satelite-orbit">
              <div className="common top satelite-orbit-motion start-animation">
                <div className="satelite"><img src={PlanetImgs[14]} /></div>
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
