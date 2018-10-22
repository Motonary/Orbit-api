import React, { Component } from 'react'
import { connect } from 'react-redux'

class TopPage extends Component {
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

export default connect(mapStateToProps)(TopPage)
