import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { HeaderIcons } from '../../constants'
import { ImgDefaultUser } from '../../constants'

class Header extends Component {
  onClickBackButton() {
    this.props.history.goBack()
  }

  onClickHeaderLeft() {
    this.props.history.push(`/users/${this.props.currentUser.id}`)
  }

  renderHeaderLeft(pathname, currentUser) {
    const rootPath = `/users/${currentUser.id}`
    // mypage以外で表示(show: true), 例外判定('hidden': pathname !== rootpathなど)すると404notfound等を拾えない
    const headerleftClasses = classNames({
      'user-info': true,
      'show-left': /^\/users\/[1-9]\d*\/projects\/[1-9]\d*$/.test(pathname) || pathname === `${rootPath}/history` || pathname === `${rootPath}/edit`
    })

    return (
      <a className={headerleftClasses} onClick={this.onClickHeaderLeft.bind(this)}>
          <div className="user-img-container">
            <img src={ImgDefaultUser} className="user-img" />
          </div>
          <div className="user-name">
            {currentUser.name}
          </div>
        </a>
    )
  }

  renderHeaderRight(pathname, currentUser) {
    const rootPath = `/users/${currentUser.id}`
    // mypage, project-page, setting-pageのみで表示(show-right: true)
    const historyButtonClasses = classNames({
      'icon-container': true,
      'show-right': pathname === `${rootPath}` || /^\/users\/[1-9]\d*\/projects\/[1-9]\d*$/.test(pathname) || pathname === `${rootPath}/edit`
    })

    // mypage, project-page, history-pageのみで表示(show-right: true)
    const settingButtonClasses = classNames({
      'icon-container': true,
      'show-right': pathname === `${rootPath}` || /^\/users\/[1-9]\d*\/projects\/[1-9]\d*$/.test(pathname) || pathname === `${rootPath}/history`
    })

    // setting-page, history-pageのみで表示(show-right: true)
    const backButtonClasses = classNames({
      'back-icon-container': true,
      'show-right': pathname === `${rootPath}/history` || pathname === `${rootPath}/edit`
    })

    return(
      <div className="links-container">
        <Link to={`/users/${currentUser.id}/history`} className={historyButtonClasses}>HISTORY
          <img src={HeaderIcons[0]} className="icon" />
        </Link>
        <Link to={`/users/${currentUser.id}/edit`} className={settingButtonClasses}>SETTING
          <img src={HeaderIcons[1]} className="icon" />
        </Link>
        <a onClick={this.onClickBackButton.bind(this)} className={backButtonClasses}>BACK
          <img src={HeaderIcons[2]} className="icon" />
        </a>
      </div>
    )
  }

  render() {
    const { currentUser, location: { pathname } } = this.props
    return (
      <div id="header">
        { this.renderHeaderLeft(pathname, currentUser) }
        { this.renderHeaderRight(pathname, currentUser) }
      </div>
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser })
)(Header)
