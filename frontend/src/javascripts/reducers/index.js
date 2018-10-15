import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import CurrentUser from './current_user'

const rootReducer = combineReducers({
  form: formReducer,
  currentUser: CurrentUser
})

export default rootReducer
