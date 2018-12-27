import * as React from 'react'
import { connect } from 'react-redux'
import Header from '../../organisms/header'
import SettingPageMain from '../../organisms/setting-page-main'
import Footer from '../../organisms/footer'

interface Props {
  currentUser: any
  location: any
  history: any
}

class SettingPage extends React.Component<Props, {}> {
  render() {
    const {
      currentUser,
      history,
      location: { pathname },
    } = this.props

    return (
      <div id="page-container">
        <Header currentUser={currentUser} history={history} pathname={pathname} />
        <SettingPageMain currentUser={currentUser} history={history} />
        <Footer currentUser={currentUser} pathname={pathname} history={history} />
      </div>
    )
  }
}

export default connect(({ currentUser }: any) => ({ currentUser }))(SettingPage)
