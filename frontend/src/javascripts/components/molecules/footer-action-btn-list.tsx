import * as React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Rival from './revival'
import Meteorite from './meteorite'
import Missle from './missile'
import BlackHole from './blackhole'

import { setModalStatus, setDestroyAction } from '../../actions/common'

import { ActionIcons } from '../../constants/images'

import '../../../stylesheets/destroy_animate.scss'

interface FooterActionBtnListProps {
  pathname: any
  rootPath: any
  motionControll: () => void

  modalOpen: string

  setModalStatus: any
  setDestroyAction: any
}

class FooterActionBtnList extends React.Component<FooterActionBtnListProps, {}> {
  onClickOpenModal(actionType: string) {
    this.props.setDestroyAction(actionType)
    this.props.setModalStatus(actionType)
    this.props.motionControll()
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
        pathname === `${rootPath}` || /^\/users\/[1-9]\d*\/projects$/.test(pathname) || pathname === `${rootPath}/history`,
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
          motionControll={() => this.props.motionControll()}
          onClick={() => {
            this.onClickOpenModal(actionType[1])
          }}
        />
        <Missle
          icon={ActionIcons[actionType[2]]}
          actionBtnClass={deleteBtnsClass}
          motionControll={() => this.props.motionControll()}
          onClick={() => {
            this.onClickOpenModal(actionType[2])
          }}
        />
        <BlackHole
          icon={ActionIcons[actionType[3]]}
          actionBtnClass={deleteBtnsClass}
          motionControll={() => this.props.motionControll()}
          onClick={() => {
            this.onClickOpenModal(actionType[3])
          }}
        />
      </ul>
    )
  }
}

export default connect(
  ({ modalOpen }: any) => ({ modalOpen }),
  { setModalStatus, setDestroyAction }
)(FooterActionBtnList)
