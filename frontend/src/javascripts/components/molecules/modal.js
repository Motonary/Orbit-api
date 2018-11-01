import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from 'react-modal'

import { setModalStatus, resetModalStatus } from '../../actions/common'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

class ConfirmModal extends Component {
  constructor(props) {
    super(props)
  }

  openModal() {
    this.props.setModalStatus(true)
  }

  afterOpenModal() {
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.props.resetModalStatus(false)
  }

  render(){
    return(
      <div>TEST</div>
    )
  }
}

export default connect(
  ({modalIsOpen}) => ({modalIsOpen}),
  { setModalStatus, resetModalStatus }
)(ConfirmModal)
