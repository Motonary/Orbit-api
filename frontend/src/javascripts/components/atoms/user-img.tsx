import * as React from 'react'
import { ROOT_URL } from '../../constants/url'

const UserImg = ({ user }: any) => (
  <div className="user-img-container">
    <img src={`${ROOT_URL}${user.avatar.url}`} className="user-img" />
  </div>
)

export default UserImg
