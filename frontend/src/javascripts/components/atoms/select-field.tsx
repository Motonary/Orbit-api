import * as React from 'react'

import '../../../stylesheets/field.scss'

interface SelectFieldProps {
  input: any,
  name: any,
  type: any,
  placeholder: any,
  meta: any,
}

const InputField: React.SFC<SelectFieldProps> = ({input, name, type, placeholder, meta: { touched, error }}) => {
  return (
    <div className="select-fieled-style">
      <select
        { ...input }
        type={type}
        placeholder={placeholder}
      >
        <option value="">SIZE</option>
        <option value="large">large</option>
        <option value="medium">medium</option>
        <option value="small">small</option>
      </select>
        <div className="input-error">{touched ? error : ''}</div>
    </div>
  )
}

export default InputField
