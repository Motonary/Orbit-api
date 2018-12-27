import * as React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import AssignmentForm from '../../molecules/forms/assignment-form'
import SubAssignmentForm from '../../molecules/forms/subassignmnet-form'
import ProjectForm from '../../molecules/forms/project-form'

import { resetModalStatus, resetSelectedStar } from '../../../actions/common'

import '../../../../stylesheets/modal.scss'
import '../../../../stylesheets/form_on_modal.scss'

interface FormModalProps {
  pathname: any

  selectedStar: any
  modalOpen: string

  resetSelectedStar: any
  resetModalStatus: any
}

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

class FormModal extends React.Component<FormModalProps, {}> {
  componentDidMount() {
    document.addEventListener('click', (e: any) => {
      const isOverlayArea = e.target.classList.contains('ReactModal__Overlay')
      if (isOverlayArea) {
        this.props.resetSelectedStar()
        this.props.resetModalStatus()
      }
    })
  }

  renderForm(orbit: string, assignmentId: string) {
    const { pathname } = this.props

    if (pathname.includes('project')) {
      return orbit !== '' ? (
        <AssignmentForm orbit={orbit} />
      ) : (
        <SubAssignmentForm assignmentId={assignmentId} />
      )
    } else {
      return <ProjectForm />
    }
  }

  render() {
    const orbit: string = this.props.modalOpen.includes('form')
      ? this.props.modalOpen.split('-')[1]
      : ''
    const assignmentId: string = this.props.modalOpen.includes('satelite')
      ? this.props.modalOpen.split('-')[2]
      : ''

    return (
      <Modal
        isOpen={orbit !== '' || assignmentId !== ''}
        style={customStyles}
        contentLabel="Assignment Form Modal"
      >
        {this.renderForm(orbit, assignmentId)}
      </Modal>
    )
  }
}

export default connect(
  ({ selectedStar, modalOpen }: any) => ({ selectedStar, modalOpen }),
  { resetModalStatus, resetSelectedStar }
)(FormModal)
