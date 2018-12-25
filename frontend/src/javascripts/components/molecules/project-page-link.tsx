import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PlanetImg from '../atoms/planet-img'

import { setCurrentProject, fetchRevolvingProjects } from '../../actions/projects'

import { PlanetImgs } from '../../constants/images'

interface ProjectPageLinkProps {
  history: any
  match: any

  revolvingProjects: any

  setCurrentProject: any
  fetchRevolvingProjects: any
}

class ProjectPageLink extends React.Component<ProjectPageLinkProps, {}> {
  componentDidMount() {
    if (!this.props.revolvingProjects) {
      this.props.fetchRevolvingProjects()
    }
  }
  onClickProjectPlanet(projectId: string) {
    const url = this.props.match.url.replace(/\/history/, '')
    this.props.setCurrentProject(this.props.revolvingProjects[projectId], () => {
      this.props.history.push(`${url}/projects`)
    })
  }

  render() {
    return (
      <div className="project-list">
        {_.map(this.props.revolvingProjects, (project: any) => {
          return (
            <div
              key={project.id}
              className="shiver-planet"
              onClick={() => this.onClickProjectPlanet(project.id)}
            >
              <PlanetImg src={PlanetImgs[project.fixed_star_type]} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(
  ({ revolvingProjects }: any) => ({ revolvingProjects }),
  { setCurrentProject, fetchRevolvingProjects }
)(ProjectPageLink)
