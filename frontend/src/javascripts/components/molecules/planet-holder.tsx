import React from 'react'
import PlanetHolderOpener from '../atoms/buttons/planet-holder-opener'
import AssignmentForm from './forms/assignment-form'
import PlanetHolderList from './planet-holder-list'
import ProjectForm from './forms/project-form'

const PlanetHolder = ({ pathname, currentUser }: any) => (
  <div id="planet-holder">
    <PlanetHolderOpener currentUser={currentUser} pathname={pathname} />
    {pathname.includes('project') ? <AssignmentForm /> : <ProjectForm />}
    <PlanetHolderList />
  </div>
)

export default PlanetHolder
