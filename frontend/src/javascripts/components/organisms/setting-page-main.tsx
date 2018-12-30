import * as React from 'react'
import Alert from 'react-s-alert'
import UserImgUpdater from '../molecules/user-img-updater'
import ProfileUpdateForm from '../molecules/forms/profile-update-form'
import SignOutBtn from '../atoms/buttons/sign-out-btn'

interface SettingPageMainProps {
  currentUser: any
  history: any
}
const SettingPageMain: React.SFC<SettingPageMainProps> = ({ currentUser, history }) => (
  <div id="setting-page">
    <UserImgUpdater currentUser={currentUser} />
    <ProfileUpdateForm history={history} />
    <SignOutBtn history={history} />
    <Alert />
  </div>
)

export default SettingPageMain
