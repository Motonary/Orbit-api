import React, { Component } from 'react'
import { Field as ReduxFormField } from 'redux-form' // Fieldの命名被り防止
import classNames from 'classnames'

import '../../../stylesheets/field.scss'

export default class Field extends Component {
  renderField({ placeholder, type, input, meta: { touched, error } }) {
    const fieldClasses = classNames({
      'has-danger': touched && error,
      'field-style': true,
      title: placeholder === 'title',
      description: placeholder === 'description',
      deadline: placeholder === 'deadline',
      username: placeholder === 'NAME',
      email: placeholder === 'EMAIL ADRESS',
      password:
        placeholder === 'PASSWORD' || placeholder === 'CONFIRM PASSWORD',
    })
    const inputClasses = classNames({
      title: placeholder === 'title',
      description: placeholder === 'description',
      deadline: placeholder === 'deadline',
      username: placeholder === 'NAME',
      email: placeholder === 'EMAIL ADRESS',
      password:
        placeholder === 'PASSWORD' || placeholder === 'CONFIRM PASSWORD',
    })
    const inputRadius = classNames({
      'input-radius':
        placeholder === 'NAME' ||
        placeholder === 'EMAIL ADRESS' ||
        placeholder === 'PASSWORD' ||
        placeholder === 'CONFIRM PASSWORD',
    })
    return (
      <div className={fieldClasses}>
        <input
          className={`${inputClasses} ${inputRadius}`}
          placeholder={placeholder}
          type={type}
          {...input}
        />
        <div className="input-error">{touched ? error : ''}</div>
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
