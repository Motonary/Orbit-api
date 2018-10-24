import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import currentUser from './current-user'
import projects from './projects'

const rootReducer = combineReducers({
  form: formReducer,
  currentUser,
  projects
})

export default rootReducer
