import * as React from 'react'
import { Link } from 'react-router-dom'
import { HeaderIcons } from '../../../constants/images'

const HeaderRightLink = ({ className, toPath, label }: any) => (
  <Link className={className} to={toPath}>
    {label}
    <img src={HeaderIcons[label]} className="icon" />
  </Link>
)

export default HeaderRightLink
