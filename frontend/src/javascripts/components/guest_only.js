import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import SignupForm from './signup_form'
import LoginForm from './login_form'
import { fetchCurrentUser } from '../actions/users'

class GuestOnly extends Component {
  // TODO: jwtをDRYに。constructorでstateにする？
  componentDidMount() {
    const jwt = localStorage.getItem('jwt')
    if(jwt) this.props.fetchCurrentUser(jwt)
  }

  render() {
    const { url } = this.props.match
    const { currentUser } = this.props

    // TODO: componentDidMountも含めてuser_only.jsと重複しているのでDRYにする
    if (localStorage.getItem('jwt') && !currentUser) return <div>Loading...</div>
    return(
      (!currentUser) ? (
        <div>
          <Switch>
            <Route path={`${url}/login`} component={LoginForm} />
            <Route path={`${url}/signup`} component={SignupForm} />
          </Switch>
        </div>
      ) : <Redirect to={`/users/${currentUser.id}`} />
    )
  }
}

function mapStateToProps({ currentUser }) {
  return { currentUser }
}

export default connect(mapStateToProps, { fetchCurrentUser })(GuestOnly)
