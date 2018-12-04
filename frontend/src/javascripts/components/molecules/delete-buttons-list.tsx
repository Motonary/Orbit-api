import React from 'react'
import _ from 'lodash'
import { DeleteIcons } from '../../constants/images'
import DeleteBtn from '../atoms/buttons/delete-btn'

const DeleteButtonsList = ({ pathname, rootPath }: any) =>
  _.map(DeleteIcons, (deleteIcon: any, key: any) => {
    return (
      <DeleteBtn
        key={key}
        deleteIcon={deleteIcon}
        pathname={pathname}
        rootPath={rootPath}
      />
    )
  })

export default DeleteButtonsList
