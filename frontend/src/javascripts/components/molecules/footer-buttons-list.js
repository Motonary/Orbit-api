import React from 'react'
import RevivalBtn from '../atoms/buttons/revival-btn'
import DeleteButtonsList from '../molecules/delete-buttons-list'

const FooterButtonsList = ({ pathname, rootPath }) => (
  <div id="action-button-holder">
    <ul id="action-button-list">
      <RevivalBtn pathname={pathname} rootPath={rootPath} />
      <DeleteButtonsList pathname={pathname} rootPath={rootPath} />
    </ul>
  </div>
)

export default FooterButtonsList
