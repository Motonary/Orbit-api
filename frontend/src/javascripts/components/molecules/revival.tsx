import * as React from 'react'
import { connect } from 'react-redux'

import ActionBtn from '../atoms/buttons/action-btn'

import { restoreAssignment } from '../../actions/assignments'

interface RevivalProps {
  icon: string
  actionBtnClass: string
  onClick: () => void

  selectedAssignments: any
  selectedDestroyAction: any
  modalOpen: any

  restoreAssignment: any
}

class Revival extends React.Component<RevivalProps, {}> {
  componentDidUpdate() {
    if (this.props.selectedAssignments.length === 0) return
    if (this.props.modalOpen !== '') return
    if (this.props.selectedDestroyAction !== 'Revival') return
    this.props.selectedAssignments.forEach((assignment: string) => {
      this.callRestoreAssignment(assignment.split('-')[0])
    })
  }

  callRestoreAssignment(assignmentId: string) {
    this.props.restoreAssignment(assignmentId)
  }

  render() {
    const { icon, actionBtnClass, onClick } = this.props

    return <ActionBtn icon={icon} actionBtnClass={actionBtnClass} onClick={onClick} />
  }
}

export default connect(
  ({ selectedAssignments, selectedDestroyAction, modalOpen }: any) => ({
    selectedAssignments,
    selectedDestroyAction,
    modalOpen,
  }),
  { restoreAssignment }
)(Revival)
