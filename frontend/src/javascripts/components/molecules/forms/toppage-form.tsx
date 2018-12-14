import * as React from 'react'
import { connect } from 'react-redux'

import InputField from '../../atoms/input-field'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

import { createSession, createUser } from '../../../actions/users'

interface TopPageFormProps {
  isSignIn: boolean,
  isSignUp: boolean,
  history: any,
  createSession: any,
  createUser: any,
}

class TopPageForm extends React.Component<TopPageFormProps> {
  onSubmitSignInData({ email, password }: any) {
    debugger
    this.props.createSession(email, password, (userId: any) => {
      this.props.history.push(`/users/${userId}`)
    })
  }

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
    const { isSignIn, isSignUp }: any = this.props
    return (
      <div className="sign-form">
        {isSignIn && !isSignUp ? (
          <form
            onSubmit={this.onSubmitSignInData.bind(this)}
          >
            <InputField placeholder="EMAIL ADRESS" name="email" type="text"  />
            <InputField placeholder="PASSWORD" name="password" type="password"  />
            <FormSubmitBtn label="SIGN IN" />
          </form>
        ) : (
          <form
            onSubmit={this.onSubmitSignUpData.bind(this)}
            className="signup-form"
          >
            <InputField placeholder="NAME" name="username" type="text"  />
            <InputField placeholder="EMAIL ADRESS" name="email" type="text"  />
            <InputField placeholder="PASSWORD" name="password" type="password"  />
            <InputField
              placeholder="CONFIRM PASSWORD"
              name="confirmation"
              type="password"
            />
            <FormSubmitBtn label="SIGN UP" />
          </form>
        )}
      </div>
    )
  }
}

export default connect(
  null,
  { createSession, createUser }
)(TopPageForm)
