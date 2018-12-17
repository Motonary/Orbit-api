import * as React from 'react'
import { connect } from 'react-redux'

import InputField from '../../atoms/input-field'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

import { createSession } from '../../../actions/users'

interface SignInFormProps {
  history: any // historyの型付け

  createSession: any
}

class SignInForm extends React.Component<SignInFormProps, {}> {
  onSubmitSignInData() {
    const email: string = 'ririco722tomato@example.com'
    const password: string = 'password'
    this.props.createSession(email, password, (userId: number) => {
      this.props.history.push(`/users/${userId}`)
    })
  }

  render() {
    console.log('rendered')
    console.log(this.props.history)
    return (
      <div className="signin-form">
        <form onSubmit={this.onSubmitSignInData.bind(this)}>
          <InputField placeholder="EMAIL ADRESS" name="email" type="text" />
          <InputField placeholder="PASSWORD" name="password" type="password" />
          <FormSubmitBtn label="SIGN IN" />
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { createSession }
)(SignInForm)
