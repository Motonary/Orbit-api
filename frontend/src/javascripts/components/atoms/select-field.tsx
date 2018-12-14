import * as React from 'react'

import '../../../stylesheets/field.scss'

const InputField: React.SFC = () => {
  return (
    <div className="select-fieled-style">
      <select
        // { ...input }
        // type={type}
        // placeholder={placeholder}
      >
        <option value="">SIZE</option>
        <option value="large">large</option>
        <option value="medium">medium</option>
        <option value="small">small</option>
      </select>
        {/* <div className="input-error">{touched ? error : ''}</div> */}
    </div>
  )
}

export default InputField
