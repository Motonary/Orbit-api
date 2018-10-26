import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDestroyedAssignments, restoreAssignment } from '../../actions/assignments'

class HistoryPage extends Component {
  componentDidMount() {
    this.props.fetchDestroyedAssignments()
  }

  renderDestroyedAssignments(eachAssignment) {
    return <div key={eachAssignment.id}>{eachAssignment.title}</div>
  }

  onRestoreAssignment(assignmentId) {
    this.props.restoreAssignment(assignmentId)
  }

  render() {
    const { destroyedAssignments } = this.props
    if (!destroyedAssignments) return <div>Loading...</div>
    
    return(
      <div>
        <div>Hello, history page!</div>
        <a onClick={this.onRestoreAssignment.bind(this, 7)}>RESTORE</a>
        <div>{destroyedAssignments.map(this.renderDestroyedAssignments)}</div>
      </div>
    )
  }
}

export default connect(
  ({ destroyedAssignments }) => ({ destroyedAssignments }),
  { fetchDestroyedAssignments, restoreAssignment }
)(HistoryPage)
