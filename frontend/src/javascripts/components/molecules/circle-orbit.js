import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectAssignment,
  disselectAssignment,
} from '../../actions/assignments'
import PopupBox from '../atoms/popup-box'
import { PlanetCheckedImgs } from '../../constants/images'
import Planet from '../atoms/planet'

class CircleOrbit extends Component {
  onMouseOver(e) {
    const target_planet = e.target.parentNode.firstChild
    target_planet.style.display = 'inline-block'
    //console.log(target_planet)
  }
  onMouseOut(e) {
    const target_planet = e.target.parentNode.firstChild
    target_planet.style.display = 'none'
    //console.log(target_planet)
  }

  onSelected(planet_type, e) {
    const target = e.target.nextElementSibling
    const target_img = e.target
    const selectedPlanetId = target.id

    //console.log(e.target, planet_type)
    //console.log(this.props)

    if (selectedPlanetId) {
      target_img.src = PlanetCheckedImgs[planet_type]
      this.props.selectAssignment(selectedPlanetId)
    }
  }

  render() {
    const { revolvingAssignments, orbit } = this.props
    if (!revolvingAssignments) return <div>Loading...</div>

    const pos = ['top', 'right', 'left', 'bottom']

    if (revolvingAssignments[orbit].length === 0) {
      return <div className={`circle-${this.props.orbit} common-circle`} />
    }

    return revolvingAssignments[orbit].map((assignmentInfo, index) => {
      return (
        <div
          className={`circle-${this.props.orbit} common-circle`}
          key={assignmentInfo.id}
        >
          <div
            className={`common ${pos[index]} ${
              assignmentInfo.orbit_pos
            }-orbit-motion start-animation`}
          >
            <div
              className={`planet-${assignmentInfo.planet_size}-${
                assignmentInfo.orbit_pos
              }`}
              onMouseOver={this.onMouseOver.bind(this)}
              onMouseOut={this.onMouseOut.bind(this)}
            >
              <PopupBox assignmentInfo={assignmentInfo} />
              <Planet
                className="planet"
                planetType={assignmentInfo.planet_type}
                onCLick={this.onSelected.bind(this, assignmentInfo.planet_type)}
              />
              <canvas
                id={`${assignmentInfo.id}-${assignmentInfo.planet_type}`}
                className="canvas"
              />
            </div>
          </div>
        </div>
      )
    })
  }
}

export default connect(
  ({ revolvingAssignments }) => ({ revolvingAssignments }),
  { selectAssignment, disselectAssignment }
)(CircleOrbit)
