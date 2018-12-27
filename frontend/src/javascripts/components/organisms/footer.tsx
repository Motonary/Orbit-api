import * as React from 'react'

import PlanetHolder from '../molecules/planet-holder'
import FooterActionBtnList from '../molecules/footer-action-btn-list'
import ConfirmModal from './modals/confirm-modal'
import FormModal from './modals/form-modal'
import TutorialModal from './modals/tutorial-modal'

import '../../../stylesheets/destroy_animate.scss'

interface FooterProps {
  currentUser: any
  pathname: any
  history: any
}

class Footer extends React.Component<FooterProps, {}> {
  componentDidMount() {
    let planet_list: any = document.getElementById('planet-list')
    planet_list.style.display = 'none'
  }

  motionControll() {
    const orbitalMove: any = [
      document.getElementsByClassName('primo-orbit-motion'),
      document.getElementsByClassName('secundus-orbit-motion'),
      document.getElementsByClassName('tertius-orbit-motion'),
      document.getElementsByClassName('satelite-orbit-motion'),
    ]

    for (const target of orbitalMove) {
      for (let i = 0; i < target.length; i++) {
        target[i].classList.toggle('pause-animation')
        target[i].classList.toggle('start-animation')
        target[i].firstChild.classList.toggle('pause-animation')
        target[i].firstChild.classList.toggle('start-animation')
      }
    }
  }

  render() {
    const { currentUser, pathname, history }: any = this.props
    const rootPath = `/users/${currentUser.id}`

    return (
      <div id="footer">
        <PlanetHolder pathname={pathname} currentUser={currentUser} />
        <FooterActionBtnList
          pathname={pathname}
          rootPath={rootPath}
          currentUser={currentUser}
          history={history}
          motionControll={() => this.motionControll()}
        />
        <ConfirmModal motionControll={() => this.motionControll()} />
        <FormModal pathname={pathname} />
        <TutorialModal currentUser={currentUser} pathname={pathname} />
      </div>
    )
  }
}

export default Footer
