import * as React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import ConfirmBtn from '../../atoms/buttons/confirm-btn'

import { removeFirstVisitFlag } from '../../../actions/users'

import '../../../stylesheets/modal.scss'

interface TutorialModalProps {
  currentUser: any

  removeFirstVisitFlag: any
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

class TutorialModal extends React.Component<TutorialModalProps, {}> {
  closeModal(/*isDestroy*/) {
    this.props.removeFirstVisitFlag()
  }

  render() {
    const { currentUser } = this.props
    return (
      <Modal
        isOpen={currentUser.first_visit_flag}
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
