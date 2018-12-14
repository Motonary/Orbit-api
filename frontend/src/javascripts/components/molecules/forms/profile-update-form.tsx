import * as React from 'react'
import { connect } from 'react-redux'

import InputField from '../../atoms/input-field'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

import { updateProfile } from '../../../actions/users'

type ProfileUpdateFormProps = {
  updateProfile: any,
  history: any
}

class ProfileUpdateForm extends React.Component<ProfileUpdateFormProps> {
  onSubmit({ username, email, password, confirmation }: any) {
    // TODO: Flashメッセージの実装
    if (window.confirm('プロフィール情報を更新していいですか？')) {
      this.props
        .updateProfile(username, email, password, confirmation)
        .then(() => this.props.history.push('/'))
    }
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit.bind(this)}
        className="update-form"
      >
        <InputField placeholder="NAME" name="username" type="text" />
        <InputField placeholder="EMAIL ADRESS" name="email" type="text" />
        <InputField placeholder="PASSWORD" name="password" type="password" />
        <InputField
          placeholder="CONFIRM PASSWORD"
          name="confirmation"
          type="password"
        />
        <FormSubmitBtn label="UPDATE" />
      </form>
    )
  }
}
//  参考資料として
// function validate(values: any) {
//   const errors: any= {}

//   if (values.username && values.username.length > 50) {
//     errors.username = 'Too long username'
//   }

//   if (values.email && values.email.length > 255) {
//     errors.email = 'Too long email address'
//   } else if (
//     values.email &&
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//   ) {
//     errors.email = 'Invalid email address'
//   }

//   if (!values.password) {
//     errors.password = 'Password required to update profile'
//   } else if (values.password.length < 6) {
//     errors.password = 'Password must contain at least 6 characters'
//   }

//   if (!values.confirmation) {
//     errors.confirmation = 'Password confirmation required'
//   } else if (values.password !== values.confirmation) {
//     errors.confirmation = 'Not match password'
//   }
//   return errors
// }

export default connect(
    null,
    { updateProfile }
  )(ProfileUpdateForm)
