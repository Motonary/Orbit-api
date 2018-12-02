import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAvatar } from '../../../actions/users'

class SelectAvatarBtn extends Component {
  onSelectAvatar(e) {
    if (window.confirm('アイコンを本当に変更しますか？')) {
      this.props.updateAvatar(e.target.files[0])
    }
  }

  render() {
    return (
      <label className="submit-btn for-avatar">
        SELECT AVATAR
        <input
          className="display-none"
          name="avatar"
          accept="image/*"
          type="file"
          onChange={this.onSelectAvatar.bind(this)}
        />
      </label>
    )
  }
}

export default connect(
  null,
  { updateAvatar }
)(SelectAvatarBtn)
