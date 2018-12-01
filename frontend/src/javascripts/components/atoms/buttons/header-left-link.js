import React, { Component } from 'react'
import classNames from 'classnames'

class HeaderLeftLink extends Component {
  onClickHeaderLeft() {
    this.props.history.push(`/users/${this.props.currentUser.id}`)
  }

  render() {
    const { pathname, currentUser } = this.props
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
            src={`http://localhost:3000${currentUser.avatar.url}`}
            className="user-img"
          />
        </div>
        <div className="user-name">{currentUser.name}</div>
      </a>
    )
  }
}

export default HeaderLeftLink
