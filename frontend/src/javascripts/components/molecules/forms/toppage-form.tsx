import * as React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { connect } from 'react-redux'
import { createSession, createUser } from '../../../actions/users'
import Field from '../../atoms/field'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

interface Props extends InjectedFormProps<FormData, {}> {
  isSignIn: boolean,
  isSignUp: boolean,
  history: any,
  createSession: any,
  createUser: any,
  handleSubmit: any,
}

class TopPageForm extends React.Component<Props> {
  onSubmitSignInData({ email, password }: any) {
    // this.props.createSession(email, password, (userId: any) => {
    //   this.props.history.push(`/users/${userId}`)
    // })
  }

  onSubmitSignUpData({ username, email, password, confirmation }: any) {
    // this.props.createUser(
    //   username,
    //   email,
    //   password,
    //   confirmation,
    //   (newUserId: any) => {
    //     this.props.history.push(`/users/${newUserId}`)
    //   }
    // )
  }

  render() {
    const { isSignIn, isSignUp }: any = this.props
    return (
      <div className="sign-form">
        {isSignIn && !isSignUp ? (
          <form
            onSubmit={this.props.handleSubmit(
              this.onSubmitSignInData.bind(this)
            )}
          >
            <Field placeholder="EMAIL ADRESS" name="email" type="text" />
            <Field placeholder="PASSWORD" name="password" type="password" />
            <FormSubmitBtn label="SIGN IN" />
          </form>
        ) : (
          <form
            onSubmit={this.props.handleSubmit(
              this.onSubmitSignUpData.bind(this)
            )}
            className="signup-form"
          >
            <Field placeholder="NAME" name="username" type="text" />
            <Field placeholder="EMAIL ADRESS" name="email" type="text" />
            <Field placeholder="PASSWORD" name="password" type="password" />
            <Field
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

function validate(values: any) {
  const errors: any = {}

  if (!values.email) {
    errors.email = 'Email required'
  } else if (values.email.length > 255) {
    errors.email = 'Too long email address'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Password required'
  } else if (values.password.length < 6) {
    errors.password = 'Password must contain at least 6 characters'
  }

  if (!values.username) {
    errors.username = 'Username required'
  } else if (values.username.length > 50) {
    errors.username = 'Too long username'
  }

  if (!values.confirmation) {
    errors.confirmation = 'Password confirmation required'
  } else if (values.password !== values.confirmation) {
    errors.confirmation = 'Not match password'
  }
  return errors
}

export default reduxForm({
  validate,
  form: 'TopPageForm',
})(
  connect(
    null,
    { createSession, createUser }
  )(TopPageForm)
)
