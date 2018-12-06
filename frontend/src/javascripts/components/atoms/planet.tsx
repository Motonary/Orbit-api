import * as React from 'react'
import { PlanetImgs } from '../../constants/images'

const Planet = ({
  className,
  planetType,
  onClick,
  onMouseOver,
  onMouseOut,
}: any) => (
  <div
    className={className}
    onClick={onClick}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
  >
    <img className="planet" src={PlanetImgs[planetType]} />
    <div className="mark-container">
      <div className="check-mark" />
    </div>
  </div>
)

export default Planet
