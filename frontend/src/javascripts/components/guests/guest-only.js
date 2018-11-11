import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TopPage from './top-page'

class GuestOnly extends Component {
  render() {
    // const { url } = this.props.match
    const { currentUser } = this.props

    return(
      !currentUser ? (
          <Switch>
            {/*<Route exact path={`${url}/signin`} component={TopPage} />
            <Route exact path={`${url}/signup`} component={TopPage} />*/}
            <Route exact path="/guests" component={TopPage} />
            <Route render={() => <h2>404 Not Found</h2>} />
          </Switch>
      ) : <Redirect to={`/users/${currentUser.id}`} />
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser })
)(GuestOnly)
