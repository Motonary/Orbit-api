import * as React from 'react'
import { HeaderIcons } from '../../../constants/images'

const HeaderBackLink = ({ className, onClick, label }: any) => (
  <a className={className} onClick={onClick}>
    {label}
    <img src={HeaderIcons[label]} className="icon" />
  </a>
)

export default HeaderBackLink
