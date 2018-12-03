import React from 'react'

const PopupBox = assignmentInfo => {
  const data = assignmentInfo.assignmentInfo
  const deadline = data.deadline.split('T')[0].split('-')

  return (
    <div className="detail-balloon">
      <div className="assignment-data">
        <div className="assignment-title">{data.title}</div>
        <div className="assignment-deadline">
          {deadline[0]}年{deadline[1]}月{deadline[2]}日
        </div>
        <div className="assignment-description">{data.detail}</div>
      </div>
    </div>
  )
}

export default PopupBox
