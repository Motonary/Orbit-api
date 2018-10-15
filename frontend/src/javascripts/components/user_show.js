import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserShow extends Component {
  render() {
    const { currentUser } = this.props
    if (!currentUser) {
      return <div>Loading...</div>
    }

    return(
      <div>{ currentUser.name }</div>
    )
  }
}

function mapStateToProps({ currentUser }) {
  return { currentUser }
}

export default connect(mapStateToProps)(UserShow)
