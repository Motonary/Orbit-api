import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderIcons } from '../../../constants/images'

const HeaderLink = ({ className, toPath, label }) => (
  <Link className={className} to={toPath}>
    {label}
    <img src={HeaderIcons[label]} className="icon" />
  </Link>
)

export default HeaderLink
