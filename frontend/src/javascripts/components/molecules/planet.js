import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectAssignment, disselectAssignment } from '../../actions/assignments'
import PopupBox from './popup-box'
import { PlanetImgs } from '../../constants'

class Planet extends Component {
  constructor(props) {
    super(props)
  }

  onMouseOver(e) {
    const target_planet = e.target.parentNode

    //target_planet.style.display = "inline-block"
    console.log(target_planet.style.display)
  }

  onSelected(e) {
    const target = e.target.nextElementSibling
    const selectedPlanetId = target.id
    console.log(target.id)
    console.log(this.props)
    if(target.id) {
      this.props.selectAssignment(target.id)
    }
  }

  render() {
    const pos = ['top', 'right', 'left', 'bottom']
    console.log(this.props, "planet")

    if(!this.props.revolvingAssignments) { return(<div>Loading...</div>) }

    return(
      this.props.revolvingAssignments[this.props.orbit].map((assignmentInfo) => {
        let tmp = pos[Math.floor(Math.random() * 4)]
        _.pull(pos, tmp)

        return(
          <div key={assignmentInfo.id} className={`common ${tmp} ${assignmentInfo.orbit_pos}-orbit-motion start-animation`}>
            <div className={`planet-${assignmentInfo.planet_size}-${assignmentInfo.orbit_pos}`} onMouseOver={ this.onMouseOver.bind(this) }>
              <PopupBox assignmentInfo={assignmentInfo} />
              <img src={PlanetImgs[assignmentInfo.planet_type]} className="planet" onClick={this.onSelected.bind(this)}/>
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
