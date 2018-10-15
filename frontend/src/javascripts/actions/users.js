import axios from 'axios'
// import { actionTypes } from '../constants'

export function createUser(username, email, password) {
  // TODO: デプロイしたらURL訂正
  return axios.post('http://localhost:3000/api/users/create', { username, email, password })
    // .then(res => {
    //   return {
    //     // type: actionTypes.CREATE_USER,
    //   }
    // })
}
