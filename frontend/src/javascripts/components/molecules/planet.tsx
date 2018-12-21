import * as React from 'react'
import { connect } from 'react-redux'

import CheckMark from '../atoms/check-mark'
import PlanetImg from '../atoms/planet-img'

import { selectAssignment, disselectAssignment } from '../../actions/assignments'

import { PlanetImgs } from '../../constants/images'

interface PlanetProps {
  className: string
  planetType: string

  selectAssignment: any
  disselectAssignment: any
}

class Planet extends React.Component<PlanetProps, {}> {
  onMouseOver(e: any) {
    const target_planet = e.target.parentNode.parentNode.firstChild // e.g. div.detail-ballon

    if (target_planet.classList[0].includes('popup')) {
      target_planet.style.display = 'block'
    }
  }
  onMouseOut(e: any) {
    const target_planet: any = e.target.parentNode.parentNode.firstChild

    if (target_planet.classList[0].includes('popup')) {
      target_planet.style.display = 'none'
    }
  }

  onSelected(e: any) {
    const target: any = e.target.parentNode.children[1] // e.target = .planet-img-container -> div.mark-container
    const targetPlanet: any = e.target.parentNode.parentNode // id #planet-2-Earth
    const selectedPlanet: string = targetPlanet.id.split('-') // Array(planet, 2, Earth)

    if (target.style.display === 'block') {
      target.style.display = 'none'
      this.props.disselectAssignment(`${selectedPlanet[1]}-${selectedPlanet[2]}`)
    } else if (target.style.display === '' || target.style.display === 'none') {
      target.style.display = 'block'
      this.props.selectAssignment(`${selectedPlanet[1]}-${selectedPlanet[2]}`)
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
  null,
  { selectAssignment, disselectAssignment }
)(Planet)
