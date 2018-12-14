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
  })

  const inputClasses = classNames({
    title: name === 'title',
    description: name === 'description',
    deadline: name === 'deadline',
  })

  return (
    <div className={fieldClasses}>
      <input
        className={inputClasses}
        type={type}
        placeholder={placeholder}
      />
        {/* <div className="input-error">{touched ? error : ''}</div> */}
    </div>
  )
}

export default InputField
