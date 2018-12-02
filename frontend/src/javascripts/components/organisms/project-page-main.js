import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  fetchRevolvingAssignments,
  createAssignment,
  destroyAssignment,
  selectAssignment,
  disselectAssignment,
} from '../../actions/assignments'
import {
  fetchRevolvingProjects,
  setDefaultProject,
} from '../../actions/projects'

import FixedStar from '../atoms/fixed-star'
import CircleOrbit from '../molecules/circle-orbit'
import ProjectBar from '../molecules/project-bar'

class ProjectPage extends Component {
  componentDidMount() {
    const { currentProject, revolvingProjects } = this.props
    // TODO: リファクタリング
    if (currentProject) {
      this.props.fetchRevolvingAssignments(currentProject.id)
    } else if (revolvingProjects) {
      this.props.setDefaultProject(
        revolvingProjects[Object.keys(revolvingProjects)[0]]
      )
    } else {
      this.props.fetchRevolvingProjects().then(() => {
        const { revolvingProjects } = this.props
        if (revolvingProjects) {
          this.props.setDefaultProject(
            revolvingProjects[Object.keys(revolvingProjects)[0]],
            defaultProjectId =>
              this.props.fetchRevolvingAssignments(defaultProjectId)
          )
        }
      })
    }
  }

  // onDropPlanet(title, detail, deadline, planet_type, planet_size, orbit_pos) {
  //   this.props.createAssignment(
  //     title,
  //     detail,
  //     deadline,
  //     planet_type,
  //     planet_size,
  //     orbit_pos,
  //     this.props.match.params.projectId
  //   )
  // }

  // onDestroyPlanet(assignmentId) {
  //   this.props.destroyAssignment(assignmentId)
  // }

  // addPlanet(e) {
  //   let target_class = e.target
  //   let common_planet_tag = document.createElement('div')
  //   let planet_tag = document.createElement('div')
  //   let img_tag = document.createElement('img')
  //   common_planet_tag.className =
  //     'common top secundus-orbit-motion start-animation'
  //   planet_tag.className = 'planet-medium-secundus'
  //   img_tag.src = PlanetImgs.Uranus

  //   planet_tag.appendChild(img_tag)
  //   common_planet_tag.appendChild(planet_tag)
  //   target_class.appendChild(common_planet_tag)
  // }

  render() {
    const { currentUser, match, currentProject } = this.props

    if (!currentUser) return <div>Loading....</div>

    if (currentUser.id != match.params.userId) {
      const correctPath = `/users/${currentUser.id}`
      return <Redirect to={correctPath} />
    }

    if (!currentProject) return <div>Loading....</div>

    return (
      <div>
        <div id="project-orbit">
          <FixedStar fixedStarType={currentProject.fixed_star_type} />
          <CircleOrbit orbit="primo" />
          <CircleOrbit orbit="secundus" />
          <CircleOrbit orbit="tertius" />
        </div>
        <ProjectBar />
      </div>
    )
  }
}

export default connect(
  ({
    currentUser,
    revolvingAssignments,
    revolvingProjects,
    selectedAssignments,
    currentProject,
  }) => ({
    currentUser,
    revolvingAssignments,
    revolvingProjects,
    currentProject,
    projectsOnBar: _.reject(revolvingProjects, currentProject),
    selectedAssignments,
  }),
  {
    fetchRevolvingAssignments,
    fetchRevolvingProjects,
    setDefaultProject,
    createAssignment,
    destroyAssignment,
    selectAssignment,
    disselectAssignment,
  }
)(ProjectPage)
