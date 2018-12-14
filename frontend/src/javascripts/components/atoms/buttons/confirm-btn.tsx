import * as React from 'react'

const ConfirmBtn: any = ({ message, onClick }: any) => (
  <button className="confirm-btn" onClick={onClick}>
    {message}
  </button>
)

export default ConfirmBtn
