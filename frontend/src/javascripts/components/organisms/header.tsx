import * as React from 'react'
import HeaderLeftLink from '../atoms/buttons/header-left-link'
import HeaderRightLinkList from '../molecules/header-link-list'

const Header = ({ currentUser, history, pathname }: any) => (
  <div id="header">
    <HeaderLeftLink pathname={pathname} currentUser={currentUser} history={history} />
    <HeaderRightLinkList pathname={pathname} currentUser={currentUser} history={history} />
  </div>
)

export default Header
