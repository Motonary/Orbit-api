import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './header'
import Mypage from './mypage'
import ProjectPage from './project-page'
import HistoryPage from './history-page'
import Footer from './footer'

class UserOnly extends Component {
  render() {
    const { url } = this.props.match

    return(
      this.props.currentUser ? (
        <div className="page-container">
          <Header {...this.props} />
          <Switch>
            <Route exact path={`${url}/:userId/projects/:projectId`} component={ProjectPage} />
            <Route exact path={`${url}/:userId/history`} component={HistoryPage} />
            <Route exact path={`${url}/:userId`} component={Mypage} />
            <Route render={() => <h2>404 Not Found</h2>} />
          </Switch>
          <Footer {...this.props}/>
        </div>
      ) : <Redirect to="/guests/signin" />
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser })
)(UserOnly)
