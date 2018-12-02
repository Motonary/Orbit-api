import React from 'react'
import PlanetHolderOpener from '../atoms/buttons/planet-holder-opener'
import AssignmentForm from '../molecules/forms/assignment-form'
import PlanetHolderList from '../molecules/planet-holder-list'

const PlanetHolder = ({ pathname, currentUser }) => (
  <div id="planet-holder">
    <PlanetHolderOpener currentUser={currentUser} pathname={pathname} />
    <AssignmentForm />
    <PlanetHolderList />
  </div>
)

export default PlanetHolder
