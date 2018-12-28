import * as React from 'react'
import Alert from 'react-s-alert'
import UserImgUpdater from '../molecules/user-img-updater'
import ProfileUpdateForm from '../molecules/forms/profile-update-form'
import SignOutBtn from '../atoms/buttons/sign-out-btn'

interface SettingPageMainProps {
  currentUser: any
  history: any
}
class SettingPageMain extends React.Component<SettingPageMainProps, {}> {
  showSuccessFlash(successMessage: string) {
    Alert.success(successMessage, {
      position: 'top-right',
      effect: 'jelly',
      timeout: 3000,
      offset: 80,
    })
  }

  showErrorFlash(errorMessage: string) {
    Alert.error(errorMessage, {
      position: 'top-right',
      effect: 'jelly',
      timeout: 3000,
      offset: 80,
    })
  }

  render() {
    const { currentUser, history } = this.props
    return (
      <div id="setting-page">
        <UserImgUpdater currentUser={currentUser} />
        <ProfileUpdateForm history={history} />
        <SignOutBtn history={history} />
        <Alert />
      </div>
    )
  }
}

export default SettingPageMain
