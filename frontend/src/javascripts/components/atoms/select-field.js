import React from 'react'

import '../../../stylesheets/field.scss'

const SelectField = ({
  input,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <div className="select-field-style">
      <select {...input} type={type} placeholder={placeholder}>
        <option value="">SIZE</option>
        <option value="large">large</option>
        <option value="medium">medium</option>
        <option value="small">small</option>
      </select>
      <div className="input-error">{touched ? error : ''}</div>
    </div>
  )
}

export default SelectField
