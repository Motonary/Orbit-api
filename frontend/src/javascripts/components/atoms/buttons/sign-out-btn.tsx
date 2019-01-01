import * as React from 'react'
import { connect } from 'react-redux'
import { expireCurrentUser } from '../../../actions/users'

interface Props {
  history: any
  expireCurrentUser: any
}

class SignOutBtn extends React.Component<Props, {}> {
  onClickSignOutButton() {
    if (window.confirm('サインアウトしますか？')) {
      this.props.expireCurrentUser(() => this.props.history.push('/'))
    }
  }

  render() {
    return (
      <button className="signout-btn" onClick={this.onClickSignOutButton.bind(this)}>
        SIGN OUT
      </button>
    )
  }
}

export default connect(
  null,
  { expireCurrentUser }
)(SignOutBtn)
