import * as React from 'react'
import { connect } from 'react-redux'

import HistoryCanvas from '../molecules/history-canvas'
import StoredPlanetList from '../molecules/stored-planet-list'

import { fetchDestroyedAssignments } from '../../actions/assignments'

interface HistoryPageMainProps {
  history: any
  match: any

  fetchDestroyedAssignments: any
}

class HistoryPageMain extends React.Component<HistoryPageMainProps, {}> {
  componentDidMount() {
    this.props.fetchDestroyedAssignments()
  }

  render() {
    return (
      <div id="history-container">
        <HistoryCanvas history={this.props.history} match={this.props.match} />
        <StoredPlanetList />
      </div>
    )
  }
}

export default connect(
  null,
  { fetchDestroyedAssignments }
)(HistoryPageMain)
