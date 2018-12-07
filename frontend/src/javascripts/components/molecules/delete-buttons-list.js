import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { setModalStatus, igniteDestroyPlanets } from '../../actions/common'

import { DeleteIcons } from '../../constants/images'

import Meteorite from '../atoms/meteorite'
import Missle from '../atoms/missle'
import BlackHole from '../atoms/blackhole'

class DeleteButtonsList extends Component {
  onClickOpenModal(actionType) {
    this.props.setModalStatus('destroy')
    this.props.igniteDestroyPlanets(actionType)
    this.motionControll()
  }

  motionControll() {
    const target_classes = [
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
    const actionType = Object.keys(DeleteIcons)
    const deleteButtonsclass = classNames({
      'delete-buttons-show':
        pathname === `${rootPath}` ||
        /^\/users\/[1-9]\d*\/projects$/.test(pathname) ||
        pathname === `${rootPath}/history`,
    })

    return (
      <div className={deleteButtonsclass}>
        <Meteorite
          icon={DeleteIcons[actionType[0]]}
          onClick={this.onClickOpenModal(actionType[0])}
        />
        <Missle
          icon={DeleteIcons[actionType[1]]}
          onClick={this.onClickOpenModal(actionType[1])}
        />
        <BlackHole
          icon={DeleteIcons[actionType[2]]}
          onClick={this.onClickOpenModal(actionType[2])}
        />
      </div>
    )
  }
}

export default connect(
  null,
  { setModalStatus, igniteDestroyPlanets }
)(DeleteButtonsList)
