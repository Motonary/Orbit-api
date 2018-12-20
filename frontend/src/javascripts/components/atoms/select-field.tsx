import * as React from 'react'

import '../../../stylesheets/field.scss'

interface SelectFieldProps {
  name: string
  value: string
  onChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void
  onBlur: (e: React.SyntheticEvent<HTMLSelectElement>) => void
}

const SelectField: React.SFC<SelectFieldProps> = ({ name, value, onChange, onBlur }) => {
  return (
    <div className="select-field-style">
      <select name={name} value={value} onChange={onChange} onBlur={onBlur}>
        <option value="">SIZE</option>
        <option value="large">large</option>
        <option value="medium">medium</option>
        <option value="small">small</option>
      </select>
    </div>
  )
}

export default SelectField
