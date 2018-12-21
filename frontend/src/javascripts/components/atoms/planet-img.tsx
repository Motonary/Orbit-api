import * as React from 'react'

interface PlanetImgProps {
  src: string
  classnames: string
}

const PlanetImg: React.SFC<PlanetImgProps> = ({ src = '', classnames = '' }) => (
  <img className={classnames} src={src} />
)

export default PlanetImg
