import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import FixedStarInList from '../atoms/fixed-star-in-list'
import { fetchRevolvingAssignments } from '../../actions/assignments'
import { changeCurrentProject } from '../../actions/projects'

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

  render() {
    const ProjectList = _.map(this.props.revolvingProjects, project => {
      return (
        <FixedStarInList
          key={project.id}
          project={project}
          className="revolving-project"
          onClick={this.onClickFixedStarOnBar.bind(this, project.id)}
        />
      )
    })

    return (
      <div id="project-bar">
        <ul className="projects-list">{ProjectList}</ul>
      </div>
    )
  }
}

export default connect(
  ({ revolvingProjects }) => ({ revolvingProjects }),
  { changeCurrentProject, fetchRevolvingAssignments }
)(ProjectBar)
