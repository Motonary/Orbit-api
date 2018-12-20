import * as React from 'react'
import { connect } from 'react-redux'
import UserImgUpdater from '../molecules/user-img-updater'
import ProfileUpdateForm from '../molecules/forms/profile-update-form'
import SignOutBtn from '../atoms/buttons/sign-out-btn'

const SettingPageMain = ({ currentUser, history }: any) => (
  <div id="setting-page">
    <UserImgUpdater currentUser={currentUser} />
    <ProfileUpdateForm history={history} />
    <SignOutBtn history={history} />
  </div>
)

export default connect(({ currentUser }: any) => ({ currentUser }))(SettingPageMain)
