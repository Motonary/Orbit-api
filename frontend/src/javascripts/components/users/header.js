import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component {
  onClickBackButton() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div>
        <div className="text-primary">
          {this.props.currentUser.name}
        </div>
        <Link to="/hoge">HiSTORY</Link>
        <Link to="/hoge">SETTING</Link>
        <a onClick={this.onClickBackButton.bind(this)}>BACK</a>
      </div>
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser })
)(Header)
