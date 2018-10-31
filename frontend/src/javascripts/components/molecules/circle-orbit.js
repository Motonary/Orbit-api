import React, { Component } from 'react'
import { PlanetImgs } from '../../constants'
import Planet from './planet'

class CircleOrbit extends Component {
  constructor(props) {
    super(props)
  }

  onSelected(e) {
    const target = e.target.parentNode.nextElementSibling
    let selectedPlanet = this.state.selectedPlanet

    console.log(this.state.selectedPlanet)
  }

  render() {
    return(
      <div className={`circle-${this.props.orbit} common-circle`} >
        <Planet orbit={this.props.orbit} />
      </div>
    )
  }
}

export default CircleOrbit
