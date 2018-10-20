import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <Redirect to={'/login'} />
    )
  }
}

export default Auth
