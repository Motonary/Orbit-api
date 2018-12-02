import React, { Component } from 'react'
import { Field as ReduxFormField } from 'redux-form' // Fieldの命名被り防止

export default class Field extends Component {
  renderField({ placeholder, type, input, meta: { touched, error } }) {
    const classNames = `form-group ${
      touched && error ? 'has-danger' : ''
    } field-style fieled-text`
    return (
      <div className={classNames}>
        <input
          className="text-style"
          placeholder={placeholder}
          type={type}
          {...input}
        />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    )
  }

  render() {
    const { name, type, placeholder } = this.props

    return (
      <ReduxFormField
        name={name}
        type={type}
        placeholder={placeholder}
        component={this.renderField}
      />
    )
  }
}
