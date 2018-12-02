import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createSession, createUser } from '../../../actions/users'
import Field from '../../atoms/field'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

class TopPageForm extends Component {
  onSubmitSignInData({ email, password }) {
    this.props.createSession(email, password, userId => {
      this.props.history.push(`/users/${userId}`)
    })
  }

  onSubmitSignUpData({ username, email, password, confirmation }) {
    this.props.createUser(
      username,
      email,
      password,
      confirmation,
      newUserId => {
        this.props.history.push(`/users/${newUserId}`)
      }
    )
  }

  render() {
    const { isSignIn, isSignUp } = this.props
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

function validate(values) {
  const errors = {}

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
