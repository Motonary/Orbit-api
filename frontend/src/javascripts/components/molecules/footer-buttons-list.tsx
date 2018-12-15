import * as React from 'react'
import RevivalBtn from '../atoms/buttons/revival-btn'
import DeleteButtonsList from './delete-buttons-list'

const FooterButtonsList = ({ pathname, rootPath }: any) => (
  <div id="action-button-holder">
    <ul id="action-button-list">
      <RevivalBtn pathname={pathname} rootPath={rootPath} />
      <DeleteButtonsList pathname={pathname} rootPath={rootPath} />
    </ul>
  </div>
)

export default FooterButtonsList
