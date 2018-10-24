import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AboutPage extends Component {
  // TODO: Sessionで場合分け c.f)guest_only.js
  render() {
    return(
      <div>
        <div>Hello, About Page!</div>
        <Link to="/guests/login">Sign in</Link>
      </div>
    )
  }
}
