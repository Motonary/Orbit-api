import axios from 'axios'
import { actionTypes } from '../constants/actiontypes'
import { ROOT_URL } from '../constants/url'

interface BaseAction {
  type: string
  payload?: any
}

interface CreateSubAssignmentAction extends BaseAction {
  type: string
  newSubAssignment: Object
}

export type SubAssignmentAction = CreateSubAssignmentAction

export function createSubAssignment(
  title: any,
  description: any,
  deadline: any,
  planet_type: any,
  planet_size: any,
  assignmentId: any
): Promise<CreateSubAssignmentAction | void> {
  return axios({
    method: 'post',
    url: `${ROOT_URL}/api/subassignments`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
    data: {
      assignment: {
        title,
        description,
        deadline,
        planet_type,
        planet_size,
      },
      assignment_id: assignmentId,
    },
  })
    .then(res => {
      return {
        type: actionTypes.CREATE_SUBASSIGNMENT,
        newSubAssignment: res.data,
      }
    })
    .catch(() => alert('Sorry, something went wrong...'))
}
