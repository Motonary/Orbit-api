import * as React from 'react'

import PopupAssignmentCard from './popup-assignment-card'
import PopupProjectCard from './popup-project-card'

const PopupBox = ({ data, isProject }: any) => {
  const popupClass = isProject ? 'project-popup' : 'assignment-popup'
  return (
    <div className={popupClass}>
      {isProject ? <PopupProjectCard project={data} /> : <PopupAssignmentCard assignment={data} />}
    </div>
  )
}

export default PopupBox
