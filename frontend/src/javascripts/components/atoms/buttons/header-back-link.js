import React from 'react'
import { HeaderIcons } from '../../../constants/images'

const HeaderBackLink = ({ className, onClick, label }) => (
  <a className={className} onClick={onClick}>
    {label}
    <img src={HeaderIcons[label]} className="icon" />
  </a>
)

export default HeaderBackLink
