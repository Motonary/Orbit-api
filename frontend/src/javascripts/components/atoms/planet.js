import React from 'react'
import { PlanetImgs } from '../../constants/images'

const Planet = ({ assignmentInfo, onClick }) => (
  <img
    src={PlanetImgs[assignmentInfo.planet_type]}
    className="planet"
    onClick={onClick}
  />
)

export default Planet
