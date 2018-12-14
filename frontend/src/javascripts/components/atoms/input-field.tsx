import * as React from 'react'
import classNames from 'classnames'

import '../../../stylesheets/field.scss'

interface InputFieldProps {
  name: string,
  type: string,
  placeholder: string,
}

const InputField: React.SFC<InputFieldProps> = ({name, type, placeholder}) => {

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
      name === 'username' ||
      name === 'email' ||
      name === 'password' ||
      name === 'confirmation',
  })


  return (
    <div className={fieldClasses}>
      <input
        className={`${inputClasses} ${inputRadius}`}
        type={type}
        placeholder={placeholder}
      />
        {/* <div className="input-error">{touched ? error : ''}</div> */}
    </div>
  )
}

export default InputField
