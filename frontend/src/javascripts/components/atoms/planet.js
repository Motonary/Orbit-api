import React from 'react'
import { PlanetImgs } from '../../constants/images'

const Planet = ({ className, planetType, onClick }) => (
  <img className={className} src={PlanetImgs[planetType]} onClick={onClick} />
)

export default Planet
