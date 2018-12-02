import React, { Component } from 'react'
import { connect } from 'react-redux'
import { expireCurrentUser } from '../../../actions/users'

class SignOutBtn extends Component {
  onClickSignOutButton() {
    this.props.expireCurrentUser(() => this.props.history.push('/'))
  }

  render() {
    return (
      <button
        className="signout-btn"
        onClick={this.onClickSignOutButton.bind(this)}
      >
        SIGN OUT
      </button>
    )
  }
}

export default connect(
  null,
  { expireCurrentUser }
)(SignOutBtn)
