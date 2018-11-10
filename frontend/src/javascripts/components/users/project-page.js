import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchRevolvingAssignments,
         createAssignment,
         destroyAssignment,
         selectAssignment,
         disselectAssignment } from '../../actions/assignments'
import { fetchRevolvingProjects, setDefaultProject } from '../../actions/projects'

import { PlanetImgs } from '../../constants/images'
import CircleOrbit from '../molecules/circle-orbit'
import ProjectBar from '../molecules/project-bar'

class ProjectPage extends Component {
  componentDidMount() {
    const { currentProject, revolvingProjects } = this.props
    // TODO: リファクタリング
    if (currentProject) {
      this.props.fetchRevolvingAssignments(currentProject.id)
    } else if (revolvingProjects) {
      this.props.setDefaultProject(_.toArray(revolvingProjects)[0])
    } else {
      this.props.fetchRevolvingProjects()
       .then(() => {
         if (this.props.revolvingProjects) this.props.setDefaultProject(_.toArray(this.props.revolvingProjects)[0])
       })
    }
  }

  onClickPlanet() {
    // TODO: タスク詳細のポップアップ実装,
  }

  onDropPlanet(title, detail, deadline, planet_type, planet_size, orbit_pos) {
    this.props.createAssignment(
      title, detail, deadline, planet_type, planet_size, orbit_pos, this.props.match.params.projectId
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

    if (currentUser.id != this.props.match.params.userId) {
      const correctPath = `/users/${currentUser.id}`
      return <Redirect to={correctPath} />
    }

    if (!this.props.currentProject) { return(<div>Loading....</div>) }

    // console.log(this.props.projectsOnBar)
    // this.props.projectsOnBarに、バーに表示されるべき恒星一覧が配列に格納されてるのでmapとかでrenderして下さい
    // nextProjectIdを渡してthis.onClickFixedStarOnBarを発火すると動的にreducerが変化します

    return(
      <div>
        <div id="project-orbit">
          <div id="fixed-star" onClick={this.addSatelitePlanet.bind(this)}><img src={PlanetImgs[this.props.currentProject.fixed_star_type]} /></div>
          <CircleOrbit orbit="primo"/>
          <CircleOrbit orbit="secundus"/>
          <CircleOrbit orbit="tertius"/>
          {/*<div onClick={this.onClickDestroyPlanets.bind(this)}>YOOOO</div>*/}
        </div>
        <ProjectBar />
      </div>
    )
  }
}

export default connect(
  ({ currentUser, revolvingAssignments, revolvingProjects, selectedAssignments, currentProject }) => (
    { currentUser,
      revolvingAssignments,
      revolvingProjects,
      currentProject,
      projectsOnBar: _.reject(revolvingProjects, currentProject),
      selectedAssignments
    }
  ),
  { fetchRevolvingAssignments, fetchRevolvingProjects, setDefaultProject, createAssignment,
    destroyAssignment, selectAssignment, disselectAssignment }

)(ProjectPage)
