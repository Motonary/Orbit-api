import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../organisms/header'
import ProfilePageMain from '../../organisms/profile-page-main'
import Footer from '../../organisms/footer'

class ProfilePage extends Component {
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
        <ProfilePageMain currentUser={currentUser} history={history} />
        <Footer currentUser={currentUser} pathname={pathname} />
      </div>
    )
  }
}

export default connect(({ currentUser }) => ({ currentUser }))(ProfilePage)
