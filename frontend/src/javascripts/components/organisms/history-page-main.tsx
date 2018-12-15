import * as React from 'react'
import { connect } from 'react-redux'
import {
  fetchDestroyedAssignments,
  restoreAssignment,
} from '../../actions/assignments'
import { PlanetImgs } from '../../constants/images'

interface Props {
  destroyedAssignments: any
  fetchDestroyedAssignments: any
  restoreAssignment: any
}

class HistoryPageMain extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.fetchDestroyedAssignments()
  }

  renderDestroyedAssignments(eachAssignment: any) {
    return <li key={eachAssignment.id}>{eachAssignment.title}</li>
  }

  onRestoreAssignment(assignmentId: any) {
    this.props.restoreAssignment(assignmentId)
  }

  renderStoredPlanetList() {
    return PlanetImgs.map((planetImg: any) => {
      return (
        <li key={planetImg} className="planet">
          <img src={planetImg} className="stored-planet" />
        </li>
      )
    })
  }

  render() {
    const { destroyedAssignments } = this.props
    if (!destroyedAssignments) return <div>Loading...</div>

    return (
      <div id="history-container">
        {/*<a onClick={this.onRestoreAssignment.bind(this, 7)}>RESTORE</a>*/}
        {/*<div>{destroyedAssignments.map(this.renderDestroyedAssignments)}</div>*/}
        <ul id="stored-planet-list" />
      </div>
    )
  }
}

export default connect(
  ({ destroyedAssignments }: any) => ({ destroyedAssignments }),
  { fetchDestroyedAssignments, restoreAssignment }
)(HistoryPageMain)
