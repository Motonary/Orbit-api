import React from 'react'
import RevivalBtn from '../atoms/buttons/revival-btn'
import DeleteButtonsList from './delete-buttons-list'

const FooterButtonsList = ({ pathname, rootPath }: any) => (
  <div id="disapperance-holder">
    <ul className="disapperance-list">
      <RevivalBtn pathname={pathname} rootPath={rootPath} />
      <DeleteButtonsList pathname={pathname} rootPath={rootPath} />
    </ul>
  </div>
)

export default FooterButtonsList
