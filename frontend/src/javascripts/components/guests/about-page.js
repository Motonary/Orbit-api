import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

class AboutPage extends Component {
  render() {
    const { currentUser } = this.props
    return(
      (!currentUser) ? (
        /* TODO: ここにOrbitのAboutページを書いていく */
        <div>
          <div>Hello, About Page!</div>
          <Link to="/guests/login">Sign in </Link>
        </div>
      ) : <Redirect to={`/users/${currentUser.id}`} />
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser })
)(AboutPage)
