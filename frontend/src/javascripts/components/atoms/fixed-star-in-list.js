import React from 'react'
import { PlanetImgs } from '../../constants/images'

const FixedStarInList = ({ project, className, onClick }) => (
  <li className={className} onClick={onClick}>
    <img src={PlanetImgs[project.fixed_star_type]} />
  </li>
)

export default FixedStarInList
