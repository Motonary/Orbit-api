import * as React from 'react'

import HistoryCanvas from '../molecules/history-canvas'
import StoredPlanetList from '../molecules/stored-planet-list'

const HistoryPageMain: React.SFC<{}> = ({}) => {
  return (
    <div id="history-container">
      <HistoryCanvas />
      <StoredPlanetList />
    </div>
  )
}

export default HistoryPageMain
