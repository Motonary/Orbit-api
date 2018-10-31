import React from 'react'

const PopupBox = (assignmentInfo) => {
  const datas = assignmentInfo.data

  return(
    <div className="detail-balloon">
      <div className="assignment-title">{datas.title}</div>
      <span>{datas.deadline}</span>
      <div className="assignment-description">
        {datas.detail}
      </div>
      <div className="select-btn">選択</div>
    </div>
  )
}

export default PopupBox
