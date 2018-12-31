import * as React from 'react'
import { connect } from 'react-redux'

import CheckMark from '../atoms/check-mark'
import PlanetImg from '../atoms/planet-img'

import { selectAssignment, disselectAssignment } from '../../actions/assignments'
import { selectProject, disselectProject } from '../../actions/projects'

import { PlanetImgs } from '../../constants/images'

interface PlanetProps {
  className: string
  planetType: string

  selectedProject: any

  selectAssignment: any
  disselectAssignment: any
  selectProject: any
  disselectProject: any
}

class Planet extends React.Component<PlanetProps, {}> {
  onMouseOver(e: any) {
    const targetPlanet = e.target.parentNode.parentNode.firstChild // e.g. div.detail-ballon
    const firstClass = targetPlanet.classList[0]

    if (firstClass && firstClass.includes('popup')) {
      targetPlanet.style.display = 'block'
    }
  }

  onMouseOut(e: any) {
    const targetPlanet: any = e.target.parentNode.parentNode.firstChild
    const firstClass = targetPlanet.classList[0]

    if (firstClass && firstClass.includes('popup')) {
      targetPlanet.style.display = 'none'
    }
  }

  onSelected(e: any) {
    const target: any = e.target.parentNode.children[1] // e.target = .planet-img-container -> div.mark-container
    const targetPlanet: any = e.target.parentNode.parentNode // id #planet-2-Earth
    const selectedPlanet: string = targetPlanet.id.split('-') // Array(planet, 2, Earth)

    if (target.style.display === 'block') {
      target.style.display = 'none'
      if (selectedPlanet[0] === 'planet') {
        this.props.disselectAssignment(`${selectedPlanet[1]}-${selectedPlanet[2]}`)
      } else {
        this.props.disselectProject(`${selectedPlanet[1]}-${selectedPlanet[2]}`)
      }
    } else if (target.style.display === '' || target.style.display === 'none') {
      target.style.display = 'block'
      if (selectedPlanet[0] === 'planet') {
        this.props.selectAssignment(`${selectedPlanet[1]}-${selectedPlanet[2]}`)
      } else {
        this.props.selectProject(`${selectedPlanet[1]}-${selectedPlanet[2]}`)
      }
    }
  }

  render() {
    const { className, planetType } = this.props
    return (
      <div
        className={className}
        onClick={this.onSelected.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
      >
        <PlanetImg src={PlanetImgs[planetType]} />
        <CheckMark />
      </div>
    )
  }
}

export default connect(
  ({ selectedProject }: any) => ({ selectedProject }),
  { selectAssignment, disselectAssignment, selectProject, disselectProject }
)(Planet)
