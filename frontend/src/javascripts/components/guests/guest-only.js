import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TopPage from './top-page'

class GuestOnly extends Component {
  render() {
    const { url } = this.props.match
    const { currentUser } = this.props

    return(
      (!currentUser) ? (
        <div>
          <Switch>
            <Route exact path={`${url}/login`} component={TopPage} />
            <Route exact path={`${url}/signup`} component={TopPage} />
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
