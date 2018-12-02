import React from 'react'
import RevivalBtn from '../atoms/buttons/revival-btn'
import DeleteButtonsList from '../molecules/delete-buttons-list'

const FooterButtonsList = ({ pathname, rootPath }) => (
  <div id="disapperance-holder">
    <ul className="disapperance-list">
      <RevivalBtn pathname={pathname} rootPath={rootPath} />
      <DeleteButtonsList pathname={pathname} rootPath={rootPath} />
    </ul>
  </div>
)

export default FooterButtonsList
