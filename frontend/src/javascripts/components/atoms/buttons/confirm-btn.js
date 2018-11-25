import React from 'react'

import '../../../../stylesheets/confirm_btn.scss'

const ConfirmBtn = message => (
  <button className="confirm-btn">{message.message}</button>
)

export default ConfirmBtn
