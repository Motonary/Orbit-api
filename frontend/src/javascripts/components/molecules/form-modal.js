import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import AssignmentForm from './forms/assignment-form'

import '../../../stylesheets/modal.scss'

const customStyles = {
  overlay: {
    zIndex: '1000',
    backgroundColor: 'rgba(13, 25, 36, 0)',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '400px',
    height: '280px',
    backgroundColor: 'rgba(13, 25, 36, 0.7)',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '10px',
    marginRight: '-50%',
    color: '#fff',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#app')

class FormModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen === 'form'}
        style={customStyles}
        contentLabel="Assignment From Modal"
      >
        <AssignmentForm />
      </Modal>
    )
  }
}

export default connect(
  ({ selectedStar, modalIsOpen }) => ({ selectedStar, modalIsOpen }),
  null
)(FormModal)
