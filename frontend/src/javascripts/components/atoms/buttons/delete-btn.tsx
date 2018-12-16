import * as React from 'react'

interface DeleteBtnProps {
  icon: string
  deleteBtnClass: string
  onClick: () => any
}

const DeleteBtn: React.SFC<DeleteBtnProps> = ({
  icon,
  deleteBtnClass,
  onClick,
}: any) => {
  return (
    <li className={deleteBtnClass} onClick={onClick}>
      <img src={icon} className="delete-btn" />
    </li>
  )
}

export default DeleteBtn
