import * as React from 'react'
import { connect } from 'react-redux'

import CheckMark from '../atoms/check-mark'
import PlanetImg from '../atoms/planet-img'

import { selectAssignment, disselectAssignment } from '../../actions/assignments'

import { PlanetImgs } from '../../constants/images'

interface PlanetProps {
  className: string
  imgClassName: string
  planetType: string

  selectAssignment: any
  disselectAssignment: any
}

class Planet extends React.Component<PlanetProps, {}> {
  onMouseOver(e: any) {
    const target_planet = e.target.parentNode.parentNode // e.g. div.planet-secundus-small
    if (target_planet.firstChild.classList[0] === 'detail-balloon') {
      target_planet.firstChild.style.display = 'inline-block'
    }
  }
  onMouseOut(e: any) {
    const target_planet: any = e.target.parentNode.parentNode

    if (target_planet.firstChild.classList[0] === 'detail-balloon') {
      target_planet.firstChild.style.display = 'none'
    }
  }

  onSelected(e: any) {
    const target: any = e.target.parentNode.children[1] // e.target = .planet-img-container -> div.mark-container
    const targetPlanet: any = e.target.parentNode.parentNode.children[2] // canvas #2-Earth
    const selectedPlanet: string = targetPlanet.id

    if (target.style.display === 'block') {
      target.style.display = 'none'
      this.props.disselectAssignment(selectedPlanet)
    } else if (target.style.display === '' || target.style.display === 'none') {
      target.style.display = 'block'
      this.props.selectAssignment(selectedPlanet)
    }
  }

  render() {
    const { className, imgClassName, planetType } = this.props
    return (
      <div
        className={className}
        onClick={this.onSelected.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
      >
        <PlanetImg src={PlanetImgs[planetType]} classnames={imgClassName} />
        <CheckMark />
      </div>
    )
  }
}

export default connect(
  null,
  { selectAssignment, disselectAssignment }
)(Planet)
