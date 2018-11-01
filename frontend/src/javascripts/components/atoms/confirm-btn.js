import React from 'react'

import '../../../stylesheets/confirm_btn.scss'

const ConfirmBtn = (message) => {
  return(
    <button className="confirm-btn">{ message }</button>
  )
}

export default ConfirmBtn
