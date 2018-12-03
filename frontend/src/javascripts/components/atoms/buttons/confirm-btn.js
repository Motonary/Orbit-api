import React from 'react'

const ConfirmBtn = ({ message, onClick }) => (
  <button className="confirm-btn" onClick={onClick}>
    {message}
  </button>
)

export default ConfirmBtn
