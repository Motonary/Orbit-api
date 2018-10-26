import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ImgHistoryIcon from '../../../images/main/history_icon.png'
import ImgSettingIcon from '../../../images/main/setting_icon.png'
import ImgBackIcon from '../../../images/main/back_icon.png'

class Header extends Component {
  onClickBackButton() {
    this.props.history.goBack()
  }
//TODO: 細かいデザインの調整必要 with IBUKI
  render() {
    const { currentUser } = this.props
    return (
      <div id="header">
        <Link to={`/users/${currentUser.id}/history`} className="icon-container">HISTORY
          <img src={ImgHistoryIcon} className="icon" />
        </Link>
        <Link to="/hoge" className="icon-container">SETTING
          <img src={ImgSettingIcon} className="icon" />
        </Link>
        <a onClick={this.onClickBackButton.bind(this)} className="back-icon-container">BACK
          <img src={ImgBackIcon} className="icon" />
        </a>
      </div>
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser })
)(Header)
