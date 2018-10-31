import React, { Component } from 'react'
import PopupBox from './popup-box'
import { PlanetImgs } from '../../constants'

/*
const Planet = (orbit) => {
  console.log(orbit)
  return(<div>LOLO</div>)
}
export default Planet
*/

class Planet extends Component {
  constructor(props) {
    super(props)
    console.log(this.props, "construct")

    this.state = {
      planetList: this.props.revolvingAssignments[this.props.orbit]
    }
  }


  onMouseOver(e) {
    const target_planet = e.target.parentNode

    //target_planet.style.display = "inline-block"
    console.log(target_planet.style.display)
  }

  render() {
    if(!this.state.planetList) { return(<div>Loading...</div>) }

    if (this.state.planetList.length == 0) { return(<div>Loading...</div>) }

    return(
      this.state.planetList.map((assignmentInfo) => {
        //console.log(assignmentInfo, "rendered")
        return(
          <div key={assignmentInfo.id} className={`common right ${assignmentInfo.orbit_pos}-orbit-motion start-animation`}>
            <div className={`planet-${assignmentInfo.planet_size}-${assignmentInfo.orbit_pos}`} onMouseOver={ this.onMouseOver.bind(this) }>
              <PopupBox assignmentInfo={assignmentInfo} />
              <img src={PlanetImgs[assignmentInfo.planet_type]} className="planet" />
              <canvas id={`${assignmentInfo.id}-${assignmentInfo.planet_type}`} className="canvas"></canvas>
            </div>
          </div>
        )
      })
    )
  }
}

export default connet(({revolvingAssignments} => ({revolvingAssignments}))(Planet)
