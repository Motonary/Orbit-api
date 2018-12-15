import * as React from 'react'
import { connect } from 'react-redux'
import Header from '../../organisms/header'
import HistoryPageMain from '../../organisms/history-page-main'
import Footer from '../../organisms/footer'

interface Props {
  currentUser: any
  location: any
  history: any
}

class HistoryPage extends React.Component<Props, {}> {
  // historypage自体が全然出来上がってないのでとりあえずの状態
  render() {
    const {
      currentUser,
      history,
      location: { pathname },
    } = this.props

    return (
      <div className="page-container">
        <Header
          currentUser={currentUser}
          history={history}
          pathname={pathname}
        />
        <HistoryPageMain />
        <Footer currentUser={currentUser} pathname={pathname} />
      </div>
    )
  }
}

export default connect(({ currentUser }: any) => ({ currentUser }))(HistoryPage)
