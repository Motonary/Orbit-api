import * as React from 'react'
import { connect } from 'react-redux'
import { updateUserImg } from '../../../actions/users'

interface Props {
  updateUserImg: any
}

class SelectUserImgBtn extends React.Component<Props, {}> {
  onSelectUserImg(e: any) {
    if (window.confirm('アイコンを本当に変更しますか？')) {
      this.props.updateUserImg(e.target.files[0])
    }
  }

  render() {
    return (
      <label className="submit-btn for-user-img">
        SELECT <br /> USER IMAGE
        <input
          className="display-none"
          name="avatar"
          accept="image/*"
          type="file"
          onChange={this.onSelectUserImg.bind(this)}
        />
      </label>
    )
  }
}

export default connect(
  null,
  { updateUserImg }
)(SelectUserImgBtn)
