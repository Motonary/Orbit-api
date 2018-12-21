import * as React from 'react'

import PopupAssignmentCard from './popup-assignment-card'
import PopupProjectCard from './popup-project-card'

const PopupBox = ({ data, isProject }: any) => {
  return (
    <div className="detail-balloon">
      {isProject ? <PopupProjectCard project={data} /> : <PopupAssignmentCard assignment={data} />}
    </div>
  )
}

export default PopupBox
