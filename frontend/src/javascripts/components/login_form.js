import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class LoginForm extends Component {
  renderField(field) {
    return(
      <div className="form-group">
        <label>{field.label}</label>
        <input
          {...field.input}
          className="form-control"
          type="text"
        />
      </div>
    )
  }

  render() {
    return(
      <form>
        <Field
          label="Email"
          name="email"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          component={this.renderField}
        />
      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.email) errors.email = "Email must exist"
  if (!values.password) errors.password = "Password must exist"
}

export default reduxForm({
  validate,
  form: 'LoginForm'
})(LoginForm)
