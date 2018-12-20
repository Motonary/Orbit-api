import * as React from 'react'

import ActionBtn from '../atoms/buttons/action-btn'

interface RevivalProps {
  icon: string
  actionBtnClass: string
  onClick: () => void
}

class Revival extends React.Component<RevivalProps, {}> {
  render() {
    const { icon, actionBtnClass, onClick } = this.props

    return <ActionBtn icon={icon} actionBtnClass={actionBtnClass} onClick={onClick} />
  }
}

export default Revival
