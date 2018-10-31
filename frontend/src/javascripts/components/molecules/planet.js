import React from 'react'
import PopupBox from './popup-box'
import { PlanetImgs } from '../../constants'

const Planet = (orbit) => {
  const planet_list = orbit.orbit

  if(planet_list.length == 0) { return(<div>Loading...</div>) }
  else {
    return(
      planet_list.map((object) => {
        return(
          <div key={object.id} className="common right first-orbit-motion start-animation">
            <div className={`planet-${object.planet_size}-${object.orbit_pos}`} >
              <PopupBox data={object} />
              <img src={PlanetImgs[object.planet_type]} className="planet" />
            </div>
          </div>
        )
      })
    )
  }

}

export default Planet
