import * as React from 'react'
import Alert from 'react-s-alert'
import FixedStar from '../molecules/fixed-star'
import CircleOrbit from '../molecules/circle-orbit'
import ProjectBar from '../molecules/project-bar'

import '../../../stylesheets/project_page.scss'

interface Props {
  currentProject: any
}

const ProjectPageMain: React.SFC<Props> = ({ currentProject }) => (
  <div id="project-container">
    <div id="project-orbit">
      <FixedStar project={currentProject} />
      <CircleOrbit orbit="primo" />
      <CircleOrbit orbit="secundus" />
      <CircleOrbit orbit="tertius" />
    </div>
    <ProjectBar currentProject={currentProject} />
    <Alert />
  </div>
)

export default ProjectPageMain
