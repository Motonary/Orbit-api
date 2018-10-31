import React from 'react'

const PopupBox = (data) => {
  //console.log(data)
  return(
    <div className="detail-balloon">
      <div className="assignment-title">{data.data.title}</div>
      <span>{data.data.deadline}</span>
      <div className="assignment-description">
        {data.data.detail}
      </div>
      <div className="select-btn">選択</div>
    </div>
  )
}

export default PopupBox
