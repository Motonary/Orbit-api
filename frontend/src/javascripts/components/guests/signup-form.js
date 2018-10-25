import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createUser } from '../../actions/users'

class SignupForm extends Component {
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
    this.props.createUser(username, email, password, confirmation, (newUserId) => {
      this.props.history.push(`/users/${newUserId}`)
    })
  }

  render() {
    return(
      <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
        <Field placeholder="NAME" name="username" type="text" component={this.renderField} />
        <Field placeholder="EMAIL ADRESS" name="email" type="text" component={this.renderField} />
        <Field placeholder="PASSWORD" name="password" type="password" component={this.renderField} />
        <Field placeholder="CONFIRM PASSWORD" name="confirmation" type="password" component={this.renderField} />
        <button type="submit" className="submit-btn">SIGN UP</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.username) {
    errors.username = "Username required"
  } else if (values.username.length > 50) {
    errors.username = "Too long username"
  }

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

  if (!values.confirmation) {
    errors.confirmation = "Password confirmation required"
  } else if (values.password !== values.confirmation) {
    errors.confirmation = "Not match password"
  }
  return errors
}

export default reduxForm({
  validate,
  form: 'SignupForm'
})(connect(null, { createUser })(SignupForm))
