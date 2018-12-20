import * as React from 'react'

interface ActionBtnProps {
  icon: string
  actionBtnClass: string
  onClick: () => any
}

const ActionBtn: React.SFC<ActionBtnProps> = ({ icon, actionBtnClass, onClick }: any) => {
  return (
    <li className={actionBtnClass} onClick={onClick}>
      <img src={icon} className="action-icon" />
    </li>
  )
}

export default ActionBtn
