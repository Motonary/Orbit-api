import * as React from 'react'
import classNames from 'classnames'

import '../../../stylesheets/field.scss'

interface InputFieldProps {
  type: string
  name: string
  placeholder: string
  value: string
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
  onBlur: (e: React.SyntheticEvent<HTMLInputElement>) => void
}

const InputField: React.SFC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
}) => {
  const fieldClasses = classNames({
    'field-style': true,
    title: name === 'title',
    description: name === 'description',
    deadline: name === 'deadline',
    username: name === 'username',
    email: name === 'email',
    password: name === 'password' || name === 'confirmation',
  })

  const inputClasses = classNames({
    title: name === 'title',
    description: name === 'description',
    deadline: name === 'deadline',
    username: name === 'username',
    email: name === 'email',
    password: name === 'password' || name === 'confirmation',
  })

  const inputRadius = classNames({
    'input-radius':
      name === 'username' || name === 'email' || name === 'password' || name === 'confirmation',
  })

  return (
    <div className={fieldClasses}>
      <input
        className={`${inputClasses} ${inputRadius}`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default InputField
