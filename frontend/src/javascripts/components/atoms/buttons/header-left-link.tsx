import * as React from 'react'
import classNames from 'classnames'
import UserImg from '../user-img'
import UserName from '../user-name'

interface Props {
  pathname: any
  currentUser: any
  history: any
}

class HeaderLeftLink extends React.Component<Props, {}> {
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
      <a className={headerleftClasses} onClick={this.onClickHeaderLeft.bind(this)}>
        <UserImg user={currentUser} />
        <UserName user={currentUser} />
      </a>
    )
  }
}

export default HeaderLeftLink
