import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchRevolvingAssignments,
         createAssignment,
         destroyAssignment } from '../../actions/assignments'
import { selectAssignment, disselectAssignment } from '../../actions/assignments'

import { PlanetImgs } from '../../constants'
import CircleOrbit from '../molecules/circle-orbit'

class ProjectPage extends Component {
  constructor(props) {
    super(props)
    // DRYにするためstateで定義
    this.state = {
      userId: props.match.params.userId,
      projectId: props.match.params.projectId,
      selectedPlanet: []
    }
  }

  componentDidMount() {
    this.props.fetchRevolvingAssignments(this.state.projectId)
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

    return(
      <div id="project-orbit">
        <div id="fixed-star" onClick={this.addSatelitePlanet.bind(this)}><img src={PlanetImgs.Uranus} /></div>
        <CircleOrbit orbit="primo"/>
        <CircleOrbit orbit="secundus"/>
        <CircleOrbit orbit="tertius"/>
        {/*<div onClick={this.onClickDestroyPlanets.bind(this)}>YOOOO</div>*/}
      </div>
    )
  }
}

export default connect(
  ({ currentUser, revolvingAssignments, selectedAssignments }) => ({ currentUser, revolvingAssignments, selectedAssignments }),
  { fetchRevolvingAssignments, createAssignment, destroyAssignment, selectAssignment, disselectAssignment }
)(ProjectPage)
