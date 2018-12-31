import * as React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import MyPageTutorial from '../../atoms/mypage-tutorial'
import ProjectPageTutorial from '../../atoms/projectpage-tutorial'
import ConfirmBtn from '../../atoms/buttons/confirm-btn'

import { removeFirstVisitFlag } from '../../../actions/users'

import '../../../../stylesheets/tutorial_modal.scss'

interface TutorialModalProps {
  currentUser: any
  pathname: any

  removeFirstVisitFlag: any
}

interface TutorialModalState {
  isFirstMyPgae: boolean
  isFirstProjectPage: boolean
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
    width: '550px',
    backgroundColor: 'rgba(13, 25, 36, 0.9)',
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
      isFirstMyPgae:
        props.currentUser.first_visit_flag && props.pathname === `/users/${props.currentUser.id}`,
      isFirstProjectPage: props.currentUser.first_visit_flag && props.pathname.includes('projects'),
    }
  }

  closeModal() {
    this.setState({ isFirstMyPgae: false })
    if (this.state.isFirstProjectPage) {
      this.props.removeFirstVisitFlag(this.props.currentUser)
      this.setState({ isFirstProjectPage: false })
    }
  }

  render() {
    const { isFirstMyPgae, isFirstProjectPage } = this.state
    return (
      <Modal
        isOpen={isFirstMyPgae || isFirstProjectPage}
        style={customStyles}
        contentLabel="Tutorial Modal"
      >
        <div id="tutorial-modal">
          {isFirstMyPgae && !isFirstProjectPage ? <MyPageTutorial /> : <ProjectPageTutorial />}
        </div>
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
