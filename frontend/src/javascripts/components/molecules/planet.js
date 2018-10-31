import React from 'react'
import PopupBox from './popup-box'
import { PlanetImgs } from '../../constants'

onMouseOverFunc(e) {
  const target_planet = e.target.parentNode

  console.log(target_planet.style)
}

const Planet = (orbit) => {
  const planet_list = orbit.orbit

  if(planet_list.length == 0) { return(<div>Loading...</div>) }
  return(
    planet_list.map((object) => {
      return(
        <div key={object.id} className={`common right ${object.orbit_pos}-orbit-motion start-animation`}>
          <div className={`planet-${object.planet_size}-${object.orbit_pos}`} onMouseOver={this.onMouseOverFunc.bind(this)}>
            <PopupBox assignmentInfo={object} />
            <img src={PlanetImgs[object.planet_type]} className="planet" />
          </div>
        </div>
      )
    })
  )
}

export default Planet
