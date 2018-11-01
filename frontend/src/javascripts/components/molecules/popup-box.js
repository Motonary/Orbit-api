import React from 'react'

const PopupBox = (assignmentInfo) => {
  const data = assignmentInfo.assignmentInfo

  return(
    <div className="detail-balloon">
      <div className="assignment-title">{data.title}</div>
      <span>{data.deadline}</span>
      <div className="assignment-description">
        {data.detail}
      </div>
      <div className="select-btn">選択</div>
    </div>
  )
}

export default PopupBox
