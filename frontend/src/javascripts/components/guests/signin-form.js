import React, { Component } from 'react'
import { Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux'
import { createSession } from '../../actions/users'

class SigninForm extends Component {
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

  onSubmit({ email, password }) {
    this.props.createSession(email, password, userId => {
      this.props.history.push(`/users/${userId}`)
    })
  }

  render() {
    return(
      <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
        <Field placeholder="EMAIL ADRESS" name="email" type="text" component={this.renderField} />
        <Field placeholder="PASSWORD" name="password" type="password" component={this.renderField} />
        <button type="submit" className="submit-btn">SIGN IN</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}

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
  return errors
}

export default reduxForm({
  validate,
  form: 'SigninForm'
})(connect(null, { createSession })(SigninForm))
