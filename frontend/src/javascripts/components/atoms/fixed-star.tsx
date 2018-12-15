import * as React from 'react'
import { PlanetImgs } from '../../constants/images'

interface FixedStarProps {
  fixedStarType: any
}

const FixedStar: React.SFC<FixedStarProps> = ({ fixedStarType }) => {
  return (
    <div id="fixed-star">
      <img src={PlanetImgs[fixedStarType]} />
    </div>
  )
}

export default FixedStar
