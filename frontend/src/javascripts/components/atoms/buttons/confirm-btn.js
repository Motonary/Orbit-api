import React from 'react'

import '../../../../stylesheets/confirm_btn.scss'

const ConfirmBtn = ({ message, onClick }) => (
  <button className="confirm-btn" onClick={onClick}>
    {message}
  </button>
)

export default ConfirmBtn
