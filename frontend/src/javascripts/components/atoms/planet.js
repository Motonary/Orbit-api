import React from 'react'

import CheckMark from './check-mark'
import PlanetImg from './planet-img'

import { PlanetImgs } from '../../constants/images'

const Planet = ({
  className,
  planetType,
  onClick,
  onMouseOver,
  onMouseOut,
}) => (
  <div
    className={className}
    onClick={onClick}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
  >
    <PlanetImg src={PlanetImgs[planetType]} />
    <CheckMark />
  </div>
)

export default Planet
