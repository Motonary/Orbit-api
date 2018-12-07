import React from 'react'

const PopupBox = ({ assignmentInfo }) => {
  const deadline = assignmentInfo.deadline.split('T')[0].split('-')
  const { title, description } = assignmentInfo

  return (
    <div className="detail-balloon">
      <div className="assignment-data">
        <div className="assignment-title">{title}</div>
        <div className="assignment-deadline">
          {deadline[0]}年{deadline[1]}月{deadline[2]}日
        </div>
        <div className="assignment-description">{description}</div>
      </div>
    </div>
  )
}

export default PopupBox
