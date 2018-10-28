import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ImgHistoryIcon from '../../../images/main/history_icon.png'
import ImgSettingIcon from '../../../images/main/setting_icon.png'
import ImgBackIcon from '../../../images/main/back_icon.png'
import ImgUser from '../../../images/main/user_default_icon.png'

class Header extends Component {
  onClickBackButton() {
    this.props.history.goBack()
  }

  onClickHeaderLeft() {
    this.props.history.push(`/users/${this.props.currentUser.id}`)
  }

  renderHeaderRight(pathname, currentUser) {
    switch(true) {
      case /\/users\/[1-9]\d*\/edit/.test(pathname):
      return (
        <div>
          <Link to={`/users/${currentUser.id}/history`} className="icon-container">HISTORY
            <img src={ImgHistoryIcon} className="icon" />
          </Link>
          <a onClick={this.onClickBackButton.bind(this)} className="back-icon-container">BACK
            <img src={ImgBackIcon} className="icon" />
          </a>
        </div>
      )

      case /\/users\/[1-9]\d*\/history/.test(pathname):
      return (
        <div>
          <Link to={`/users/${currentUser.id}/edit`} className="icon-container">SETTING
            <img src={ImgSettingIcon} className="icon" />
          </Link>
          <a onClick={this.onClickBackButton.bind(this)} className="back-icon-container">BACK
            <img src={ImgBackIcon} className="icon" />
          </a>
        </div>
      )

      case /(\/users\/[1-9]\d*)|(\/users\/[1-9]\d*\/projects\/[1-9]\d*)/.test(pathname):
        return (
          <div>
            <Link to={`/users/${currentUser.id}/history`} className="icon-container">HISTORY
              <img src={ImgHistoryIcon} className="icon" />
            </Link>
            <Link to={`/users/${currentUser.id}/edit`} className="icon-container">SETTING
              <img src={ImgSettingIcon} className="icon" />
            </Link>
          </div>
        )

      default:
        return <div>Something wrong...</div>
    }
  }

  render() {
    const { currentUser, location: { pathname } } = this.props
    return (
      <div id="header">
        <div id="project-list">
          <a id="user-info" onClick={this.onClickHeaderLeft.bind(this)}>
            <div className="user-img-container">
              <img src={ImgUser} className="user-img" />
            </div>
            <div className="user-name">
              {currentUser.name}
            </div>
          </a>
        </div>
        {this.renderHeaderRight(pathname, currentUser)}
      </div>
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser })
)(Header)
