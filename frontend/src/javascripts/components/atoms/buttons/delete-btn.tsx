import * as React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { setModalStatus, igniteDestroyPlanets } from '../../../actions/common'

interface Props {
  setModalStatus: any,
  igniteDestroyPlanets: any,
}

class DeleteBtn extends React.Component<Props, {}> {
  onClickOpenModal(actionKey: any) {
    this.props.setModalStatus(true)
    this.props.igniteDestroyPlanets(actionKey)
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
    const { key, deleteIcon, pathname, rootPath }: any = this.props
    const deleteButtonsclasses = classNames({
      disapperance: true,
      'delete-buttons-show':
        pathname === `${rootPath}` ||
        /^\/users\/[1-9]\d*\/projects$/.test(pathname) ||
        pathname === `${rootPath}/history`,
    })

    return (
      <li
        className={deleteButtonsclasses}
        onClick={this.onClickOpenModal.bind(this, key)}
      >
        <img src={deleteIcon} className="delete-btn" />
      </li>
    )
  }
}

export default connect(
  null,
  { setModalStatus, igniteDestroyPlanets }
)(DeleteBtn)
