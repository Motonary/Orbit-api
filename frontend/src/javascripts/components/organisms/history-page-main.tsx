import * as React from 'react'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'

import HistoryCanvas from '../molecules/history-canvas'
import StoredPlanetList from '../molecules/stored-planet-list'

import { fetchDestroyedAssignments } from '../../actions/assignments'

interface HistoryPageMainProps {
  history: any
  match: any

  fetchDestroyedAssignments: any
}

class HistoryPageMain extends React.Component<HistoryPageMainProps, {}> {
  showSuccessFlash(successMessage: string) {
    Alert.success(successMessage, {
      position: 'top-right',
      effect: 'jelly',
      timeout: 3000,
      offset: 80,
    })
  }

  showErrorFlash(errorMessage: string) {
    Alert.error(errorMessage, {
      position: 'top-right',
      effect: 'jelly',
      timeout: 3000,
      offset: 80,
    })
  }

  render() {
    return (
      <div id="history-container">
        <HistoryCanvas history={this.props.history} match={this.props.match} />
        <StoredPlanetList />
        <Alert />
      </div>
    )
  }
}

export default connect(
  null,
  { fetchDestroyedAssignments }
)(HistoryPageMain)
