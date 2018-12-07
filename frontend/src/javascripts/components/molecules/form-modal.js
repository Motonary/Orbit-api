import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import AssignmentForm from './forms/assignment-form'
import ProjectForm from './forms/project-form'

import { resetModalStatus, resetSelectedStar } from '../../actions/common'

import '../../../stylesheets/modal.scss'
import '../../../stylesheets/form_on_modal.scss'

const customStyles = {
  overlay: {
    zIndex: '500',
    backgroundColor: 'rgba(13, 25, 36, 0)',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '400px',
    height: '240px',
    backgroundColor: 'rgba(13, 25, 36)',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '10px',
    marginRight: '-50%',
    color: '#fff',
    transform: 'translate(-50%, -50%)',
    zIndex: '1000',
  },
}

Modal.setAppElement('#app')

class FormModal extends Component {
  componentDidMount() {
    document.addEventListener('click', e => {
      const isOverlayArea = e.target.classList.contains('ReactModal__Overlay')
      if (isOverlayArea) {
        this.props.resetSelectedStar()
        this.props.resetModalStatus()
      }
    })
  }

  render() {
    const { pathname } = this.props
    const orbit = this.props.modalOpen
      ? this.props.modalOpen.split('-')[1]
      : null

    return (
      <Modal
        isOpen={this.props.modalOpen !== null}
        style={customStyles}
        contentLabel="Assignment From Modal"
      >
        {pathname.match(/project/) ? (
          <AssignmentForm orbit={orbit} />
        ) : (
          <ProjectForm />
        )}
      </Modal>
    )
  }
}

export default connect(
  ({ selectedStar, modalOpen }) => ({ selectedStar, modalOpen }),
  { resetModalStatus, resetSelectedStar }
)(FormModal)
