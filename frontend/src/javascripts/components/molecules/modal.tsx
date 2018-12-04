import * as React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import ConfirmBtn from '../atoms/buttons/confirm-btn'

import {
  resetModalStatus,
} from '../../actions/common'

import '../../../stylesheets/modal.scss'

const customStyles: any = {
  overlay: {
    zIndex: '1000',
    backgroundColor: 'rgba(13, 25, 36, 0)',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '400px',
    height: '100px',
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

interface Props {
  isDestroyIgnited: any,
  modalIsOpen: any,
  resetModalStatus: any,
}

interface State {
  destroy: string,
  restore: string
}

class ConfirmModal extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      destroy: '本当に選択タスクを破壊しますか？',
      restore: '本当に選択したタスクを元の場所に戻しますか？',
    }
  }

  closeModal(/*isDestroy*/) {
    this.props.resetModalStatus(false)
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-warning">{this.state.destroy}</div>
        <div className="modal-confirm-buttons">
          <ConfirmBtn
            message="いいえ"
            onClick={this.closeModal.bind(this, false)}
          />
          <ConfirmBtn
            message="はい"
            onClick={this.closeModal.bind(this, true)}
          />
        </div>
      </Modal>
    )
  }
}

export default connect(
  ({ isDestroyIgnited, modalIsOpen }: any) => ({ isDestroyIgnited, modalIsOpen }),
  {
    resetModalStatus,
  }
)(ConfirmModal)
