import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TopPage from '../pages/guests/top-page'

class GuestOnly extends Component {
  render() {
    const { currentUser } = this.props

    return !currentUser ? (
      <Switch>
        <Route exact path="/guests" component={TopPage} />
        <Route render={() => <h2>404 Not Found</h2>} />
      </Switch>
    ) : (
      <Redirect to={`/users/${currentUser.id}`} />
    )
  }
}

export default connect(({ currentUser }) => ({ currentUser }))(GuestOnly)
