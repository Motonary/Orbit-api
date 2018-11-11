import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import ImgLogo from '../../../images/index/logo.png'
import ImgPlanet from '../../../images/index/top_earth.png'

class TopPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignIn: true,
      isSignUp: false
    }
  }

  renderField({ placeholder, type, input, meta: { touched, error } }) {
    const classNames = `form-group ${touched && error ? 'has-danger' : ''} field-style fieled-text`
    return(
      <div className={classNames}>
        <input
          className="text-style"
          placeholder={placeholder}
          type={type}
          {...input} />
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    )
  }

  onSubmit({ username, email, password, confirmation }) {
    // this.props.createUser(username, email, password, confirmation, (newUserId) => {
    //   this.props.history.push(`/users/${newUserId}`)
    // })
    console.log('Success!')
  }

  render() {
    const { isSignIn, isSignUp } = this.state
    return (
      <div className="top-page-container">
        <div className="logo-container">
          <img src={ImgLogo} className="top-page-logo" />
        </div>
        <div className="sign-form">
          {(isSignIn && !isSignUp) ? (
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
              <Field placeholder="EMAIL ADRESS" name="email" type="text" component={this.renderField} />
              <Field placeholder="PASSWORD" name="password" type="password" component={this.renderField} />
              <button type="submit" className="submit-btn">SIGN IN</button>
            </form>
          ) : (
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="signup-form">
              <Field placeholder="NAME" name="username" type="text" component={this.renderField} />
              <Field placeholder="EMAIL ADRESS" name="email" type="text" component={this.renderField} />
              <Field placeholder="PASSWORD" name="password" type="password" component={this.renderField} />
              <Field placeholder="CONFIRM PASSWORD" name="confirmation" type="password" component={this.renderField} />
              <button type="submit" className="submit-btn">SIGN UP</button>
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
  // const { isSignIn, isSignUp } = this.state

  if (!values.email) {
    errors.email = "Email required"
  } else if(values.email.length > 255) {
    errors.email = "Too long email address"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Password required"
  } else if (values.password.length < 6) {
    errors.password = "Password must contain at least 6 characters"
  }

  if (!values.username) {
    errors.username = "Username required"
  } else if (values.username.length > 50) {
    errors.username = "Too long username"
  }

  if (!values.confirmation) {
    errors.confirmation = "Password confirmation required"
  } else if (values.password !== values.confirmation) {
    errors.confirmation = "Not match password"
  }
  return errors
}

export default reduxForm({
  validate,
  form: 'TopPageForm'
})(connect()(TopPage))
