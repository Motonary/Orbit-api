import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import ConfirmBtn from '../atoms/confirm-btn'

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

    this.state ={
      destroy: "本当に選択タスクを破壊しますか？",
      restore: "本当に選択したタスクを元の場所に戻しますか？"
    }
  }

  afterOpenModal() {
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.props.resetModalStatus(false)
  }

  render(){
    return(
      <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal.bind(this)}
          onRequestClose={this.props.modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div>{}</div>
        <div>
          <ConfirmBtn message="いいえ"/>
          <ConfirmBtn message="はい"/>
        </div>
      </Modal>
    )
  }
}

export default connect(
  ({modalIsOpen}) => ({modalIsOpen}),
  { setModalStatus, resetModalStatus }
)(ConfirmModal)
