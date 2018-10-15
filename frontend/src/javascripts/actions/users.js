import axios from 'axios'
import { actionTypes } from '../constants'

export function createUser(username, email, password, callback) {
  // TODO: ProductionではURL訂正
  return axios.post('http://localhost:3000/api/users/create', { username, email, password })
    .then(res => {
      callback(res.data.id)
      return {
        type: actionTypes.CREATE_USER,
        newUser: res.data
      }
    })
}
