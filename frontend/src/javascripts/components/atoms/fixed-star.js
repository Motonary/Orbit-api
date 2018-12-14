import React from 'react'
import { PlanetImgs } from '../../constants/images'

const FixedStar = ({ fixedStarType }) => {
  return (
    <div id="fixed-star">
      <img src={PlanetImgs[fixedStarType]} />
    </div>
  )
}

export default FixedStar
