import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDestroyedAssignments, restoreAssignment } from '../../actions/assignments'

class HistoryPage extends Component {
  componentDidMount() {
    this.props.fetchDestroyedAssignments()
  }

  renderDestroyedAssignments() {

  }

  onRestoreAssignment() {
    this.props.restoreAssignment()
  }

  render() {
    // const
    // if ()
    console.log(this.props.destroyedAssignments)
    return(
      <div>
        <div>Hello, history page!</div>
        <a onClick={this.onRestoreAssignment.bind(this)}>RESTORE</a>
        {/*}<div>{this.props.destroyedAssignments.map(this.renderDestroyedAssignments)}</div>*/}
      </div>
    )
  }
}

export default connect(
  ({ destroyedAssignments }) => ({ destroyedAssignments }),
  { fetchDestroyedAssignments, restoreAssignment }
)(HistoryPage)
