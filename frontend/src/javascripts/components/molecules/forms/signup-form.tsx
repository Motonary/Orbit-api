import * as React from 'react'
import { connect } from 'react-redux'

import InputField from '../../atoms/input-field'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

import { createUser } from '../../../actions/users'

interface SignUpFormProps {
  history: any

  createUser: any
}

class SignUpForm extends React.Component<SignUpFormProps, {}> {
  onSubmitSignUpData({ username, email, password, confirmation }: any) {
    this.props.createUser(
      username,
      email,
      password,
      confirmation,
      (newUserId: any) => {
        this.props.history.push(`/users/${newUserId}`)
      }
    )
  }

  render() {
    return (
      <div className="signup-form">
        <form onSubmit={this.onSubmitSignUpData.bind(this)}>
          <InputField placeholder="NAME" name="username" type="text" />
          <InputField placeholder="EMAIL ADRESS" name="email" type="text" />
          <InputField placeholder="PASSWORD" name="password" type="password" />
          <InputField
            placeholder="CONFIRM PASSWORD"
            name="confirmation"
            type="password"
          />
          <FormSubmitBtn label="SIGN UP" />
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { createUser }
)(SignUpForm)
