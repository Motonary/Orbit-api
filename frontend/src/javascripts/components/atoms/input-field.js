import React from 'react'
import classNames from 'classnames'

import '../../../stylesheets/field.scss'

const InputField = ({ input, type, placeholder, meta: { touched, error } }) => {
  const fieldClasses = classNames({
    'has-danger': touched && error,
    'field-style': true,
    title: input.name === 'title',
    description: input.name === 'description',
    deadline: input.name === 'deadline',
    username: input.name === 'username',
    email: input.name === 'email',
    password: input.name === 'password' || input.name === 'confirmation',
  })

  const inputClasses = classNames({
    title: input.name === 'title',
    description: input.name === 'description',
    deadline: input.name === 'deadline',
    username: input.name === 'username',
    email: input.name === 'email',
    password: input.name === 'password' || input.name === 'confirmation',
  })

  const inputRadius = classNames({
    'input-radius':
      input.name === 'username' ||
      input.name === 'email' ||
      input.name === 'password' ||
      input.name === 'confirmation',
  })

  return (
    <div className={fieldClasses}>
      <input
        {...input}
        className={`${inputClasses} ${inputRadius}`}
        type={type}
        placeholder={placeholder}
      />
      <div className="input-error">{touched ? error : ''}</div>
    </div>
  )
}

export default InputField
