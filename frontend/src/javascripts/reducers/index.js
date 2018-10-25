import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import currentUser from './current-user'
import projects from './projects'
import allAssignments from './assignments'

const rootReducer = combineReducers({
  form: formReducer,
  currentUser,
  projects,
  allAssignments
})

export default rootReducer
