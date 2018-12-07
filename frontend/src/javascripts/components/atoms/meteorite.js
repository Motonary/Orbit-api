import React, { Component } from 'react'
import { connect } from 'react-redux'
//import anime from 'animejs'

import { resetDestroyAction, resetModalStatus } from '../../actions/common'
import { resetSelectedAssignment } from '../../actions/assignments'

class Meteorite extends Component {
  componentDidUpdate(/*prevProps, prevState*/) {
    const selected = this.selectedAssignments && !this.props.modalOpen
    if (selected && this.props.selectedDestroyAction === 'Meteorite') {
      this.iginiteMeteoriteAnimation()
    }
  }

  render() {
    const { icon } = this.props
    return (
      <li className="delete-btn">
        <img src={icon} className="delete-icon" />
      </li>
    )
  }
}

export default connect(
  ({ selectedAssignments, selectedDestroyAction, modalOpen }) => ({
    selectedAssignments,
    selectedDestroyAction,
    modalOpen,
  }),
  {
    resetDestroyAction,
    resetModalStatus,
    resetSelectedAssignment,
  }
)(Meteorite)
