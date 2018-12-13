import * as React from 'react'
import PlanetHolderOpener from '../atoms/buttons/planet-holder-opener'
<<<<<<< HEAD:frontend/src/javascripts/components/molecules/planet-holder.tsx
import AssignmentForm from './forms/assignment-form'
import PlanetHolderList from './planet-holder-list'
import ProjectForm from './forms/project-form'
=======
import PlanetHolderList from '../molecules/planet-holder-list'
>>>>>>> 1a360e9c9e172b80387825d183ef9f9cc3d02806:frontend/src/javascripts/components/molecules/planet-holder.js

const PlanetHolder = ({ pathname, currentUser }: any) => (
  <div id="planet-holder">
    <PlanetHolderOpener currentUser={currentUser} pathname={pathname} />
    <PlanetHolderList />
  </div>
)

export default PlanetHolder
