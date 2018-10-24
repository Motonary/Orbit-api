import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './header'
import TopPage from './top-page'
import ProjectPage from './project-page'
import Footer from './footer'

class UserOnly extends Component {
  render() {
    const { url } = this.props.match

    return(
      this.props.currentUser ? (
        <div>
          <Header history={this.props.history}/>
          <Switch>
            <Route exact path={`${url}/:userId/projects/:projectId`} component={ProjectPage} />
            <Route exact path={`${url}/:userId`} component={TopPage} />
            <Route render={() => <h2>404 Not Found</h2>} />
          </Switch>
          <Footer />
        </div>
      ) : <Redirect to="/guests/login" />
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser })
)(UserOnly)
