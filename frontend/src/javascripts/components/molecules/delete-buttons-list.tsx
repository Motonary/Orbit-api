import * as React from 'react'
import _ from 'lodash'
import { DeleteIcons } from '../../constants/images'
import DeleteBtn from '../atoms/buttons/delete-btn'

const DeleteButtonsList = ({ pathname, rootPath }: any) => (
  <div>
    {_.map(DeleteIcons, (deleteIcon: any, key: any) => {
      return (
        <DeleteBtn
          key={key}
          deleteIcon={deleteIcon}
          pathname={pathname}
          rootPath={rootPath}
        />
      )
    })}
  </div>
)

export default DeleteButtonsList
