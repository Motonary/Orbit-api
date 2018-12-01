import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import HeaderLinkList from '../molecules/header-link-list'

class Header extends Component {
  onClickHeaderLeft() {
    this.props.history.push(`/users/${this.props.currentUser.id}`)
  }

  renderHeaderLeft(pathname, currentUser) {
    const rootPath = `/users/${currentUser.id}`
    // mypage以外で表示(show: true), 例外判定('hidden': pathname !== rootpathなど)すると404notfound等を拾えない
    const headerleftClasses = classNames({
      'user-info': true,
      'show-left':
        /^\/users\/[1-9]\d*\/projects$/.test(pathname) ||
        pathname === `${rootPath}/history` ||
        pathname === `${rootPath}/edit`,
    })

    return (
      <a
        className={headerleftClasses}
        onClick={this.onClickHeaderLeft.bind(this)}
      >
        <div className="user-img-container">
          <img
            src={`http://localhost:3000${this.props.currentUser.avatar.url}`}
            className="user-img"
          />
        </div>
        <div className="user-name">{currentUser.name}</div>
      </a>
    )
  }

  render() {
    const {
      currentUser,
      history,
      location: { pathname },
    } = this.props
    return (
      <div id="header">
        {this.renderHeaderLeft(pathname, currentUser)}
        <HeaderLinkList
          pathname={pathname}
          currentUser={currentUser}
          history={history}
        />
      </div>
    )
  }
}

export default connect(({ currentUser }) => ({ currentUser }))(Header)
