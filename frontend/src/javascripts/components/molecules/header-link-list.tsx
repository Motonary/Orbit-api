import * as React from 'react'
import classNames from 'classnames'
import HeaderRightLink from '../atoms/buttons/header-right-link'
import HeaderBackLink from '../atoms/buttons/header-back-link'

interface Props {
  currentUser: any
  pathname: any
  history: any
}

class HeaderRightLinkList extends React.Component<Props, {}> {
  onClickBackButton() {
    this.props.history.goBack()
  }

  render() {
    const { pathname, currentUser } = this.props
    const rootPath = `/users/${currentUser.id}`
    // mypage, project-page, setting-pageのみで表示(show-right: true)
    const historyButtonClasses = classNames({
      'icon-container': true,
      'show-right':
        pathname === `${rootPath}` ||
        /^\/users\/[1-9]\d*\/projects$/.test(pathname) ||
        pathname === `${rootPath}/edit`,
    })

    // mypage, project-page, history-pageのみで表示(show-right: true)
    const settingButtonClasses = classNames({
      'icon-container': true,
      'show-right':
        pathname === `${rootPath}` ||
        /^\/users\/[1-9]\d*\/projects$/.test(pathname) ||
        pathname === `${rootPath}/history`,
    })

    // setting-page, history-pageのみで表示(show-right: true)
    const backButtonClasses = classNames({
      'back-icon-container': true,
      'show-right': pathname === `${rootPath}/history` || pathname === `${rootPath}/edit`,
    })

    return (
      <div className="links-container">
        <HeaderRightLink
          className={historyButtonClasses}
          toPath={`/users/${currentUser.id}/history`}
          label="HISTORY"
        />
        <HeaderRightLink
          className={settingButtonClasses}
          toPath={`/users/${currentUser.id}/edit`}
          label="SETTING"
        />
        <HeaderBackLink
          className={backButtonClasses}
          onClick={this.onClickBackButton.bind(this)}
          label="BACK"
        />
      </div>
    )
  }
}

export default HeaderRightLinkList
