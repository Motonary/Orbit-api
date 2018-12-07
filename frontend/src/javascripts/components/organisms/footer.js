import React, { Component } from 'react'

import PlanetHolder from '../molecules/planet-holder'
import FooterButtonsList from '../molecules/footer-buttons-list'
import ConfirmModal from '../molecules/confirm-modal'
import FormModal from '../molecules/form-modal'

class Footer extends Component {
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

export default Footer
