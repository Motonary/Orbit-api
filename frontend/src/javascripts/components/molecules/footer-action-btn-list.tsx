import * as React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Rival from './revival'
import Meteorite from './meteorite'
import Missle from './missle'
import BlackHole from './blackhole'

import { setModalStatus, setDestroyAction } from '../../actions/common'

import { ActionIcons } from '../../constants/images'

import '../../../stylesheets/destroy_animate.scss'

interface FooterActionBtnListProps {
  pathname: any
  rootPath: any

  setModalStatus: any
  setDestroyAction: any
}

class FooterActionBtnList extends React.Component<
  FooterActionBtnListProps,
  {}
> {
  onClickOpenModal(actionType: string) {
    this.props.setDestroyAction(actionType)
    this.motionControll()
  }

  motionControll() {
    const target_classes: any = [
      document.getElementsByClassName('primo-orbit-motion'),
      document.getElementsByClassName('secundus-orbit-motion'),
      document.getElementsByClassName('tertius-orbit-motion'),
      document.getElementsByClassName('satelite-orbit-motion'),
    ]

    for (const target of target_classes) {
      for (let i = 0; i < target.length; i++) {
        target[i].classList.toggle('pause-animation')
        target[i].classList.toggle('start-animation')
      }
    }
  }

  render() {
    const { pathname, rootPath } = this.props
    const actionType = Object.keys(ActionIcons)
    const rivivalBtnClass = classNames({
      'action-btn': true,
      'revival-button-show': pathname === `${rootPath}/history`,
    })
    const deleteBtnsClass: string = classNames({
      'action-btn': true,
      'delete-buttons-show':
        pathname === `${rootPath}` ||
        /^\/users\/[1-9]\d*\/projects$/.test(pathname) ||
        pathname === `${rootPath}/history`,
    })

    return (
      <ul id="action-button-list">
        <Rival
          icon={ActionIcons[actionType[0]]}
          actionBtnClass={rivivalBtnClass}
          onClick={() => {
            this.onClickOpenModal(actionType[0])
          }}
        />
        <Meteorite
          icon={ActionIcons[actionType[1]]}
          actionBtnClass={deleteBtnsClass}
          motionControll={() => this.motionControll()}
          onClick={() => {
            this.onClickOpenModal(actionType[1])
          }}
        />
        <Missle
          icon={ActionIcons[actionType[2]]}
          actionBtnClass={deleteBtnsClass}
          motionControll={() => this.motionControll()}
          onClick={() => {
            this.onClickOpenModal(actionType[2])
          }}
        />
        <BlackHole
          icon={ActionIcons[actionType[3]]}
          actionBtnClass={deleteBtnsClass}
          motionControll={() => this.motionControll()}
          onClick={() => {
            this.onClickOpenModal(actionType[3])
          }}
        />
      </ul>
    )
  }
}

export default connect(
  null,
  { setModalStatus, setDestroyAction }
)(FooterActionBtnList)
