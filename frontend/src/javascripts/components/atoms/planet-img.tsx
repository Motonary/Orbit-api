import * as React from 'react'

interface PlanetImgProps {
  src: string
}

const PlanetImg: React.SFC<PlanetImgProps> = ({ src = '' }) => (
  <img className="planet" src={src} />
)

export default PlanetImg
