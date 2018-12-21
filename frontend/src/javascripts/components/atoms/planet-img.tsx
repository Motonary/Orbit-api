import * as React from 'react'

interface PlanetImgProps {
  src: string
}

const PlanetImg: React.SFC<PlanetImgProps> = ({ src = '' }) => <img src={src} />

export default PlanetImg
