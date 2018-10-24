import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchCurrentUser } from '../../actions/users'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = { jwt: sessionStorage.getItem('jwt') }
  }

  componentDidMount() {
    const { jwt } = this.state
    if (jwt) this.props.fetchCurrentUser(jwt)
  }

  render() {
    return (
      (this.state.jwt && !this.props.currentUser) ?
        <div>Loading...</div> : this.props.children
    )
  }
}

// Routeをネストした際に親要素も子要素もconnectを用いていると不具合が生じるため
// withrouterを用いてlocationを渡す
export default withRouter(connect(
  ({ currentUser }, { location }) => ({ currentUser, location }),
  { fetchCurrentUser }
)(Main))
