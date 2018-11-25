import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createSession, createUser } from '../../actions/users'
import TopPageButton from '../atoms/toppage-btn'
import Field from '../atoms/field'
import ImgLogo from '../../../images/index/logo.png'
import ImgPlanet from '../../../images/index/top_earth.png'

class TopPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignIn: true,
      isSignUp: false,
    }
  }

  onClickTopPageButton() {
    const { isSignIn, isSignUp } = this.state
    if (isSignIn && !isSignUp) {
      this.setState({
        isSignIn: false,
        isSignUp: true,
      })
    } else if (!isSignIn && isSignUp) {
      this.setState({
        isSignIn: true,
        isSignUp: false,
      })
    }
  }

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
    const { isSignIn, isSignUp } = this.state
    return (
      <div className="top-page-container">
        <div onClick={this.onClickTopPageButton.bind(this)}>
          <TopPageButton isSignIn={isSignIn} />
        </div>
        <div className="logo-container">
          <img src={ImgLogo} className="top-page-logo" />
        </div>
        <div className="sign-form">
          {isSignIn && !isSignUp ? (
            <form
              onSubmit={this.props.handleSubmit(
                this.onSubmitSignInData.bind(this)
              )}
            >
              <Field placeholder="EMAIL ADRESS" name="email" type="text" />
              <Field placeholder="PASSWORD" name="password" type="password" />
              <button type="submit" className="submit-btn">
                SIGN IN
              </button>
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
              <button type="submit" className="submit-btn">
                SIGN UP
              </button>
            </form>
          )}
        </div>
        <div className="planet-img-container">
          <img src={ImgPlanet} className="top-page-planet" />
        </div>
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
  )(TopPage)
)
