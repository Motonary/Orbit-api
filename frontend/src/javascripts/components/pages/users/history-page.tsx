import * as React from 'react'
import { connect } from 'react-redux'
import Header from '../../organisms/header'
import HistoryPageMain from '../../organisms/history-page-main'
import Footer from '../../organisms/footer'

interface Props {
  currentUser: any
  location: any
  history: any
  match: any
}

class HistoryPage extends React.Component<Props, {}> {
  // historypage自体が全然出来上がってないのでとりあえずの状態
  render() {
    const {
      currentUser,
      history,
      location: { pathname },
      match,
    } = this.props

    return (
      <div className="page-container">
        <Header currentUser={currentUser} history={history} pathname={pathname} />
        <HistoryPageMain history={history} match={match} />
        <Footer currentUser={currentUser} pathname={pathname} history={history} />
      </div>
    )
  }
}

export default connect(({ currentUser }: any) => ({ currentUser }))(HistoryPage)
