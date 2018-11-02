import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectAssignment, disselectAssignment } from '../../actions/assignments'
import PopupBox from './popup-box'
import { PlanetImgs } from '../../constants'
import { PlanetCheckedImgs } from '../../constants'

class Planet extends Component {
  constructor(props) {
    super(props)
  }

  onMouseOver(e) {
    const target_planet = e.target.parentNode.firstChild
    target_planet.style.display = "inline-block"
    //console.log(target_planet)
  }
  onMouseOut(e) {
    const target_planet = e.target.parentNode.firstChild
    target_planet.style.display = "none"
    //console.log(target_planet)
  }

  onSelected(planet_type, e) {
    const target = e.target.nextElementSibling
    const target_img = e.target
    const selectedPlanetId = target.id

    console.log(e.target, planet_type)
    console.log(this.props)

    if(selectedPlanetId) {
      target_img.src = PlanetCheckedImgs[planet_type]
      this.props.selectAssignment(selectedPlanetId)
    }
  }

  render() {
    const pos = ['top', 'right', 'left', 'bottom']
    let i=-1

    console.log(this.props, "planet")

    if(!this.props.revolvingAssignments) { return(<div>Loading...</div>) }

    return(
      this.props.revolvingAssignments[this.props.orbit].map((assignmentInfo) => {
        i++
        return(
          <div key={assignmentInfo.id} className={`common ${pos[i]} ${assignmentInfo.orbit_pos}-orbit-motion start-animation`}>
            <div className={`planet-${assignmentInfo.planet_size}-${assignmentInfo.orbit_pos}`}
              onMouseOver={ this.onMouseOver.bind(this) }
              onMouseOut={ this.onMouseOut.bind(this) }
            >
              <PopupBox assignmentInfo={assignmentInfo} />
              <img src={PlanetImgs[assignmentInfo.planet_type]} className="planet" onClick={this.onSelected.bind(this, assignmentInfo.planet_type)}/>
              <canvas id={`${assignmentInfo.id}-${assignmentInfo.planet_type}`} className="canvas"></canvas>
            </div>
          </div>
        )
      })
    )
  }
}

export default connect(
  ({revolvingAssignments, selectedAssignments}) => ({revolvingAssignments, selectedAssignments}),
  {selectAssignment, disselectAssignment}
)(Planet)
