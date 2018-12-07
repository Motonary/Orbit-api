import React from 'react'
import classNames from 'classnames'
import { RevivalImg } from '../../../constants/images'

const RevivalBtn = ({ pathname, rootPath }) => {
  const revivalButtonClasses = classNames({
    'delete-btn': true,
    'revival-button-show': pathname === `${rootPath}/history`,
  })

  return (
    <li className={revivalButtonClasses}>
      <img src={RevivalImg} className="delete-icon" />
    </li>
  )
}

export default RevivalBtn
