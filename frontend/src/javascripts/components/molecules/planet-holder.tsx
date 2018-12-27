import * as React from 'react'
import PlanetHolderOpener from '../atoms/buttons/planet-holder-opener'
import PlanetHolderList from '../molecules/planet-holder-list'

const PlanetHolder = ({ pathname, currentUser }: any) => (
  <div id="planet-holder">
    <PlanetHolderOpener currentUser={currentUser} pathname={pathname} />
    <PlanetHolderList pathname={pathname} />
  </div>
)

export default PlanetHolder
