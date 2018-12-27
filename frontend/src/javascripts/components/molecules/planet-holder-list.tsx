import * as React from 'react'

import PlanetList from '../molecules/planet-list'

import { FixedStarImgs, NormalPlanetImgs } from '../../constants/images'

interface PlanetHolderListProps {
  pathname: any
}

const PlanetHolderList: React.SFC<PlanetHolderListProps> = ({ pathname }) => {
  const PlanetImgs = pathname.includes('projects') ? NormalPlanetImgs : FixedStarImgs

  const planetList = Object.keys(PlanetImgs).map(key => {
    return <PlanetList key={key} planetType={key} />
  })

  return <ul id="planet-list">{planetList}</ul>
}

export default PlanetHolderList
