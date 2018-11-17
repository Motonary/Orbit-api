import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchCurrentUser } from '../../actions/users'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prevPath: '',
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('jwt')) this.props.fetchCurrentUser()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname !== prevState.prevPath) {
      return ({ prevPath: nextProps.location.pathname })
    }
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      switch (typeof child) {
        case 'string':
          // 子要素がテキストノードだった場合
          return child

        case 'object':
          // React要素だった場合
          return React.cloneElement(child, {prevPath: this.state.prevPath})

        default:
          // それ以外の場合
          return null
      }
    })[0]
    console.log(childrenWithProps)

    return (
      (sessionStorage.getItem('jwt') && !this.props.currentUser)
      ? <div>Loading...</div>
      : <div>{ childrenWithProps }</div>
    )
  }
}

// Routeをネストした際に親要素も子要素もconnectを用いていると不具合が生じるため
// withrouterを用いてlocationを渡す
export default withRouter(connect(
  ({ currentUser }, { location }) => ({ currentUser, location }),
  { fetchCurrentUser }
)(Main))
