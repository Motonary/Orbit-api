import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchCurrentUser } from '../../actions/users'

interface Props {
  currentUser: any
  fetchCurrentUser: any
}

class Main extends React.Component<Props, {}> {
  componentDidMount() {
    if (sessionStorage.getItem('jwt')) this.props.fetchCurrentUser()
  }
  render() {
    return sessionStorage.getItem('jwt') && !this.props.currentUser ? (
      <div>Loading...</div>
    ) : (
      this.props.children
    )
  }
}

// Routeをネストした際に親要素も子要素もconnectを用いていると不具合が生じるため
// withrouterを用いてlocationを渡す
export default withRouter(
  connect(
    ({ currentUser }: any, { location }: any) => ({ currentUser, location }),
    { fetchCurrentUser }
  )(Main)
)
