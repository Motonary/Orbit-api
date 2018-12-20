import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import FixedStarInList from '../atoms/fixed-star-in-list'
import { fetchRevolvingAssignments } from '../../actions/assignments'
import { changeCurrentProject } from '../../actions/projects'

import '../../../stylesheets/project_bar.scss'

interface Props {
  currentProject: any

  changeCurrentProject: any
  revolvingProjects: any
  fetchRevolvingAssignments: any
}

class ProjectBar extends React.Component<Props, {}> {
  onClickFixedStarOnBar(nextProjectId: any) {
    this.props.changeCurrentProject(this.props.revolvingProjects[nextProjectId], () => {
      this.props.fetchRevolvingAssignments(nextProjectId)
    })
  }

  render() {
    const ProjectList: any = _.map(this.props.revolvingProjects, project => {
      if (project.id !== this.props.currentProject.id) {
        return (
          <FixedStarInList
            key={project.id}
            project={project}
            className="revolving-project"
            onClick={this.onClickFixedStarOnBar.bind(this, project.id)}
          />
        )
      }
    })

    return (
      <div id="project-bar">
        <ul className="projects-list">{ProjectList}</ul>
      </div>
    )
  }
}

export default connect(
  ({ revolvingProjects }: any) => ({ revolvingProjects }),
  { changeCurrentProject, fetchRevolvingAssignments }
)(ProjectBar)
