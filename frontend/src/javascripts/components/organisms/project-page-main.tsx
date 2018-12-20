import * as React from 'react'
import FixedStar from '../atoms/fixed-star'
import CircleOrbit from '../molecules/circle-orbit'
import ProjectBar from '../molecules/project-bar'

interface Props {
  currentProject: any
}

class ProjectPageMain extends React.Component<Props, {}> {
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
    return (
      <div id="project-container">
        <div id="project-orbit">
          <FixedStar fixedStarType={this.props.currentProject.fixed_star_type} />
          <CircleOrbit orbit="primo" />
          <CircleOrbit orbit="secundus" />
          <CircleOrbit orbit="tertius" />
        </div>
        <ProjectBar currentProject={this.props.currentProject} />
      </div>
    )
  }
}

export default ProjectPageMain
