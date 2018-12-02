import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Mypage from '../pages/users/mypage'
import ProjectPage from '../organisms/project-page-main'
import HistoryPage from '../pages/users/history-page'
import ProfilePageMain from '../pages/users/profile-page'

class UserOnly extends Component {
  render() {
    const {
      currentUser,
      match: { url },
    } = this.props

    return currentUser ? (
      <div className="page-container">
        <Switch>
          <Route
            exact
            path={`${url}/:userId/projects`}
            component={ProjectPage}
          />
          <Route
            exact
            path={`${url}/:userId/history`}
            component={HistoryPage}
          />
          <Route
            exact
            path={`${url}/:userId/edit`}
            component={ProfilePageMain}
          />
          <Route exact path={`${url}/:userId`} component={Mypage} />
          <Route render={() => <h2>404 Not Found</h2>} />
        </Switch>
      </div>
    ) : (
      <Redirect to="/guests" />
    )
  }
}

export default connect(({ currentUser }) => ({ currentUser }))(UserOnly)
