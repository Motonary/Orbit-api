import axios from 'axios'
import { actionTypes } from '../constants'

export function createUser(username, email, password) {
  return axios.post({username, email, password})
    .then(res => {
      return {
        // type: actionTypes.CREATE_USER,
      }
    })
}
