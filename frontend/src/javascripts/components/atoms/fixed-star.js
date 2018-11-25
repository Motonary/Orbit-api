import React from 'react'
import { PlanetImgs } from '../../constants/images'

const FixedStar = ({ project, pos, onClick }) => (
  <div className={`common ${pos} mypage-orbit-motion start-animation`}>
    <div className="planet-large-secundus" onClick={onClick}>
      <img src={PlanetImgs[project.fixed_star_type]} />
    </div>
  </div>
)

export default FixedStar
