import React, { Component } from 'react'
import { Field, reduxForm} from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createSession } from '../../actions/users'

class LoginForm extends Component {
  renderField({ label, type, input, meta: { touched, error } }) {
    const classNames = `form-group ${touched && error ? 'has-danger' : ''}`
    return(
      <div className={classNames}>
        <label>{label}</label>
        <input className="form-control" type={type} {...input} />
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    )
  }

  onSubmit({ email, password }) {
    this.props.createSession(email, password, (userId) => {
      this.props.history.push(`/users/${userId}`)
    })
  }

  render() {
    return(
      <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Email" name="email" type="text" component={this.renderField} />
        <Field label="Password" name="password" type="password" component={this.renderField} />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/guests/signup">Sign up</Link>
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
  form: 'LoginForm'
})(connect(null, { createSession })(LoginForm))
