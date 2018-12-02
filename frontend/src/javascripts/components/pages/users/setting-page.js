import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../organisms/header'
import SettingPageMain from '../../organisms/setting-page-main'
import Footer from '../../organisms/footer'

class SettingPage extends Component {
  render() {
    const {
      currentUser,
      history,
      location: { pathname },
    } = this.props

    return (
      <div id="page-container">
        <Header
          currentUser={currentUser}
          history={history}
          pathname={pathname}
        />
        <SettingPageMain currentUser={currentUser} history={history} />
        <Footer currentUser={currentUser} pathname={pathname} />
      </div>
    )
  }
}

export default connect(({ currentUser }) => ({ currentUser }))(SettingPage)
