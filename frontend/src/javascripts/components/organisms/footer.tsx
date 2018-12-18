import * as React from 'react'

import PlanetHolder from '../molecules/planet-holder'
import FooterActionBtnList from '../molecules/footer-action-btn-list'
import ConfirmModal from '../molecules/confirm-modal'
import FormModal from '../molecules/form-modal'

import '../../../stylesheets/destroy_animate.scss'

interface FooterProps {
  currentUser: any
  pathname: any
}

class Footer extends React.Component<FooterProps, {}> {
  componentDidMount() {
    let planet_list: any = document.getElementById('planet-list')
    planet_list.style.display = 'none'
  }

  render() {
    const { currentUser, pathname }: any = this.props
    const rootPath = `/users/${currentUser.id}`

    return (
      <div id="footer">
        <PlanetHolder pathname={pathname} currentUser={currentUser} />
        <FooterActionBtnList pathname={pathname} rootPath={rootPath} />
        <ConfirmModal />
        <FormModal pathname={pathname} />
      </div>
    )
  }
}

export default Footer
