import * as React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Revival from './revival'
import Meteorite from './meteorite'
import Missle from './missile'
import BlackHole from './blackhole'

import { setModalStatus, setDestroyAction } from '../../actions/common'

import { ActionIcons } from '../../constants/images'

import '../../../stylesheets/destroy_animate.scss'

interface FooterActionBtnListProps {
  pathname: any
  rootPath: any
  history: any
  currentUser: any
  motionControll: () => void

  modalOpen: string
  selectedProject: any

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
    const { pathname, rootPath, currentUser, history, selectedProject } = this.props
    const actionType = Object.keys(ActionIcons)
    const rivivalBtnClass = classNames({
      'action-btn': true,
      'revival-button-show': pathname === `${rootPath}/history`,
    })
    const deleteBtnsClass: string = classNames({
      'action-btn': true,
      'delete-buttons-show':
        pathname === `${rootPath}` || /^\/users\/[1-9]\d*\/projects$/.test(pathname),
    })
    const blackHoleBtnClass: string = classNames({
      'restrict-button-style': selectedProject.length !== 0,
    })

    return (
      <ul id="action-button-list">
        <Revival
          icon={ActionIcons[actionType[0]]}
          actionBtnClass={rivivalBtnClass}
          onClick={() => {
            this.onClickOpenModal(actionType[0])
          }}
        />
        <Meteorite
          icon={ActionIcons[actionType[1]]}
          actionBtnClass={deleteBtnsClass}
          history={history}
          currentUser={currentUser}
          motionControll={() => this.props.motionControll()}
          onClick={() => {
            this.onClickOpenModal(actionType[1])
          }}
        />
        <Missle
          icon={ActionIcons[actionType[2]]}
          actionBtnClass={deleteBtnsClass}
          history={history}
          currentUser={currentUser}
          motionControll={() => this.props.motionControll()}
          onClick={() => {
            this.onClickOpenModal(actionType[2])
          }}
        />
        <BlackHole
          icon={ActionIcons[actionType[3]]}
          actionBtnClass={`${deleteBtnsClass} ${blackHoleBtnClass}`}
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
  ({ modalOpen, selectedProject }: any) => ({ modalOpen, selectedProject }),
  { setModalStatus, setDestroyAction }
)(FooterActionBtnList)
