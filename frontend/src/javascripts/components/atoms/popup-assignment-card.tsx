import * as React from 'react'

interface PopupAssignmentCardProps {
  assignment: any
}
const PopupAssignmentCard: React.SFC<PopupAssignmentCardProps> = ({ assignment }: any) => {
  if (!assignment) return

  const deadline: any = assignment.deadline.split('T')[0].split('-')
  const { title, description }: any = assignment

  return (
    <div className="assignment-data">
      <div className="assignment-title">{title}</div>
      <div className="assignment-deadline">
        {deadline[0]}年{deadline[1]}月{deadline[2]}日
      </div>
      <div className="assignment-description">{description}</div>
    </div>
  )
}

export default PopupAssignmentCard
