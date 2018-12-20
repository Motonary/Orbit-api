import * as React from 'react'
// import { connect } from 'react-redux'

import HistoryCanvas from '../molecules/history-canvas'
import StoredPlanetList from '../molecules/stored-planet-list'

// interface Props {
//   destroyedAssignments: any
//   fetchDestroyedAssignments: any
//   restoreAssignment: any
// }

export default class HistoryPageMain extends React.Component<{}, {}> {
  render() {
    return (
      <div id="history-container">
        <HistoryCanvas />
        <StoredPlanetList />
        {/*<a onClick={this.onRestoreAssignment.bind(this, 7)}>RESTORE</a>*/}
        {/*<div>{destroyedAssignments.map(this.renderDestroyedAssignments)}</div>*/}
      </div>
    )
  }
}

// export default connect(
//   ({ destroyedAssignments }: any) => ({ destroyedAssignments }),
//   { fetchDestroyedAssignments, restoreAssignment }
// )(HistoryPageMain)
