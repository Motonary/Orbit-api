import * as React from 'react'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'

import HistoryCanvas from '../molecules/history-canvas'
import StoredPlanetList from '../molecules/stored-planet-list'

interface HistoryPageMainProps {
  history: any
  match: any
}

const HistoryPageMain: React.SFC<HistoryPageMainProps> = ({ history, match }) => (
  <div id="history-container">
    <HistoryCanvas history={history} match={match} />
    <StoredPlanetList />
    <Alert />
  </div>
)

export default HistoryPageMain
