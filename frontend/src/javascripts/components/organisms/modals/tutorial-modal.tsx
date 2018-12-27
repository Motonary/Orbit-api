import * as React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import ConfirmBtn from '../../atoms/buttons/confirm-btn'

import { removeFirstVisitFlag } from '../../../actions/users'

import '../../../stylesheets/modal.scss'

interface TutorialModalProps {
  curretUser: any

  removeFirstVisitFlag: any
}

interface TutorialModalState {
  destroy: string
  restore: string
}

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

class TutorialModal extends React.Component<TutorialModalProps, TutorialModalState> {
  constructor(props: any) {
    super(props)

    this.state = {
      destroy: '本当に選択タスクを破壊しますか？',
      restore: '本当に選択したタスクを元の場所に戻しますか？',
    }
  }

  closeModal(/*isDestroy*/) {
    this.props.removeFirstVisitFlag()
  }

  render() {
    const { curretUser } = this.props
    const { destroy, restore } = this.state
    return (
      <Modal
        isOpen={curretUser.first_visit_flag}
        style={customStyles}
        contentLabel="Tutorial Modal"
      >
        <div className="modal-confirm-buttons">
          <ConfirmBtn message="閉じる" onClick={this.closeModal.bind(this)} />
        </div>
      </Modal>
    )
  }
}

export default connect(
  null,
  {
    removeFirstVisitFlag,
  }
)(TutorialModal)
