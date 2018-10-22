import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TopPage from './top_page'
import { fetchCurrentUser } from '../actions/users'

class UserOnly extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem('jwt')
    if(jwt) this.props.fetchCurrentUser(jwt)
  }

  render() {
    const { url } = this.props.match
    const { currentUser } = this.props

    if (localStorage.getItem('jwt') && !currentUser) return <div>Loading...</div>
    return(
      currentUser ? (
        <div>
          <Switch>
            <Route path={`${url}/:id`} component={TopPage} />
          </Switch>
        </div>
      ) : <Redirect to="/guests/login" />
    )
  }
}

function mapStateToProps({ currentUser }) {
  return { currentUser }
}

export default connect(mapStateToProps, { fetchCurrentUser })(UserOnly)
