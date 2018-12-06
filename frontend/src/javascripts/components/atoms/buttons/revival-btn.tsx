import * as React from 'react'
import classNames from 'classnames'
import { RevivalImg } from '../../../constants/images'

const RevivalBtn = ({ pathname, rootPath }: any) => {
  const revivalButtonClasses = classNames({
    disapperance: true,
    'revival-button-show': pathname === `${rootPath}/history`,
  })

  return (
    <li className={revivalButtonClasses}>
      <img src={RevivalImg} className="delete-btn" />
    </li>
  )
}

export default RevivalBtn
