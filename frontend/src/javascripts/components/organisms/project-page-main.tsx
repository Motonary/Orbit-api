import * as React from 'react'
import Alert from 'react-s-alert'
import FixedStar from '../atoms/fixed-star'
import CircleOrbit from '../molecules/circle-orbit'
import ProjectBar from '../molecules/project-bar'

import '../../../stylesheets/project_page.scss'

interface Props {
  currentProject: any
}

class ProjectPageMain extends React.Component<Props, {}> {
  showSuccessFlash(successMessage: string) {
    Alert.success(successMessage, {
      position: 'top-right',
      effect: 'jelly',
      timeout: 3000,
      offset: 80,
    })
  }

  showErrorFlash(errorMessage: string) {
    Alert.error(errorMessage, {
      position: 'top-right',
      effect: 'jelly',
      timeout: 3000,
      offset: 80,
    })
  }

  render() {
    return (
      <div id="project-container">
        <div id="project-orbit">
          <FixedStar fixedStarType={this.props.currentProject.fixed_star_type} />
          <CircleOrbit orbit="primo" />
          <CircleOrbit orbit="secundus" />
          <CircleOrbit orbit="tertius" />
        </div>
        <ProjectBar currentProject={this.props.currentProject} />
        <Alert />
      </div>
    )
  }
}

export default ProjectPageMain
