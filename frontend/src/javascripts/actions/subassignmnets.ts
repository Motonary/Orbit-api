import axios from 'axios'
import { actionTypes } from '../constants/action-types'
import { BaseAction } from '../constants/static-types'
import { ROOT_URL } from '../constants/url'

interface CreateSubAssignmentAction extends BaseAction {
  type: string
  payload: { newSubAssignment: Object }
}

export type SubAssignmentAction = CreateSubAssignmentAction

export function createSubAssignment(
  title: any,
  description: any,
  deadline: any,
  planet_type: any,
  assignmentId: any
): Promise<CreateSubAssignmentAction | void> {
  return axios({
    method: 'post',
    url: `${ROOT_URL}/api/subassignments`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    data: {
      sub_assignment: {
        title,
        description,
        deadline,
        planet_type,
      },
      assignment_id: assignmentId,
    },
  })
    .then(res => {
      return {
        type: actionTypes.CREATE_SUBASSIGNMENT,
        payload: { newSubAssignment: res.data },
      }
    })
    .catch(() => alert('Sorry, something went wrong. Please reload.'))
}
