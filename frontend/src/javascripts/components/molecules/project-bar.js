import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchRevolvingAssignments } from '../../actions/assignments'
import { changeCurrentProject } from '../../actions/projects'
import { PlanetImgs } from '../../constants/images'

import '../../../stylesheets/project_bar.scss'

class ProjectBar extends Component {
  onClickFixedStarOnBar(nextProjectId) {
    this.props.changeCurrentProject(
      this.props.revolvingProjects[nextProjectId],
      () => {
        this.props.fetchRevolvingAssignments(nextProjectId)
      }
    )
  }

  renderProjectList() {
    return _.map(this.props.revolvingProjects, (project, key) => {
      return (
        <li
          key={key}
          className="revolving-project"
          onClick={this.onClickFixedStarOnBar.bind(this, project.id)}
        >
          <img src={PlanetImgs[project.fixed_star_type]} />
        </li>
      )
    })
  }

  render() {
    return (
      <div id="project-bar">
        <ul className="projects-list">{this.renderProjectList()}</ul>
      </div>
    )
  }
}

export default connect(
  ({ revolvingProjects, revolvingAssignments }) => ({
    revolvingProjects,
    revolvingAssignments,
  }),
  { changeCurrentProject, fetchRevolvingAssignments }
)(ProjectBar)
