import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TopPage from './top_page'

class UserOnly extends Component {
  render() {
    const { url } = this.props.match

    return(
      this.props.currentUser ? (
        <div>
          <Switch>
            <Route path={`${url}/:id`} component={TopPage} />
            <Route render={() => <h2>404 Not Found</h2>} />
          </Switch>
        </div>
      ) : <Redirect to="/guests/login" />
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser })
)(UserOnly)
