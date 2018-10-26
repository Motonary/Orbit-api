import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import currentUser from './current-user'
import projects from './projects'
// FIXME: rename
import { allAssignments, destroyedAssignments } from './assignments'

const rootReducer = combineReducers({
  form: formReducer,
  currentUser,
  projects,
  allAssignments,
  destroyedAssignments
})

export default rootReducer
