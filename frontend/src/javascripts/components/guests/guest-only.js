import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import SignupForm from './signup-form'
import LoginForm from './login-form'

class GuestOnly extends Component {
  render() {
    const { url } = this.props.match
    const { currentUser } = this.props

    return(
      (!currentUser) ? (
        <div>
          <Switch>
            <Route path={`${url}/login`} component={LoginForm} />
            <Route path={`${url}/signup`} component={SignupForm} />
            <Route render={() => <h2>404 Not Found</h2>} />
          </Switch>
        </div>
      ) : <Redirect to={`/users/${currentUser.id}`} />
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser })
)(GuestOnly)
