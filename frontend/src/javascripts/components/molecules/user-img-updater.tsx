import * as React from 'react'
import UserImg from '../atoms/user-img'
import SelectUserImgBtn from '../atoms/buttons/select-user-img-btn'

const UserImgUpdater = ({ currentUser }: any) => (
  <div className="user-img-wrapper">
    <UserImg user={currentUser} />
    <SelectUserImgBtn />
  </div>
)

export default UserImgUpdater
