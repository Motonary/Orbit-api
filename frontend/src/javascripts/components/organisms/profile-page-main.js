import React from 'react'
import { connect } from 'react-redux'
import AvatarUpdater from '../molecules/avatar-updater'
import ProfileUpdateForm from '../molecules/forms/profile-update-form'
import SignOutBtn from '../atoms/buttons/sign-out-btn'

const ProfilePageMain = ({ currentUser, history }) => (
  <div id="setting-page">
    <AvatarUpdater currentUser={currentUser} />
    <ProfileUpdateForm />
    <SignOutBtn history={history} />
  </div>
)

export default connect(({ currentUser }) => ({ currentUser }))(ProfilePageMain)
