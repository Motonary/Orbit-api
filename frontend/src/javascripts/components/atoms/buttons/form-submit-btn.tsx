import * as React from 'react'

const FormSubmitBtn = ({ label, isSubmit }: any) => (
  <button type="submit" className="submit-btn" disabled={isSubmit}>
    {label}
  </button>
)

export default FormSubmitBtn
