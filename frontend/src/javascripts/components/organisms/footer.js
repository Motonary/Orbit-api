import React, { Component } from 'react'
import { connect } from 'react-redux'

import PlanetHolder from '../molecules/planet-holder'
import FooterButtonsList from '../molecules/footer-buttons-list'
import ConfirmModal from '../molecules/confirm-modal'
import FormModal from '../molecules/form-modal'

import {
  destroyAssignment,
  nullifySelectedAssignment,
} from '../../actions/assignments'
import {
  setSelectedStar,
  resetSelectedStar,
  resetDestroyPlanets,
} from '../../actions/common'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let planet_list = document.getElementById('planet-list')
    planet_list.style.display = 'none'
  }

  render() {
    const { currentUser, pathname } = this.props
    const rootPath = `/users/${currentUser.id}`

    return (
      <div id="footer">
        <PlanetHolder pathname={pathname} currentUser={currentUser} />
        <FooterButtonsList pathname={pathname} rootPath={rootPath} />
        <ConfirmModal />
        <FormModal pathname={pathname} />
      </div>
    )
  }
}

export default connect(
  ({
    currentUser,
    selectedAssignments,
    selectedStar,
    isDestroyIgnited,
    modalOpen,
  }) => ({
    currentUser,
    selectedAssignments,
    isDestroyIgnited,
    selectedStar,
    modalOpen,
  }),
  {
    destroyAssignment,
    nullifySelectedAssignment,
    setSelectedStar,
    resetSelectedStar,
    resetDestroyPlanets,
  }
)(Footer)
