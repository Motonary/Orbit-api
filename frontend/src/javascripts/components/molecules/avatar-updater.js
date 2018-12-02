import React from 'react'
import UserImg from '../atoms/user-img'
import SelectAvatarBtn from '../atoms/buttons/select-avatar-btn'

const AvatarUpdater = ({ currentUser }) => (
  <div className="avatar-wrapper">
    <UserImg user={currentUser} />
    <SelectAvatarBtn />
  </div>
)

export default AvatarUpdater
