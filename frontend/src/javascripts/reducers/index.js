import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import currentUser from './current-user'
import { revolvingProjects } from './projects'
import { revolvingAssignments, destroyedAssignments } from './assignments'

const rootReducer = combineReducers({
  // Form
  form: formReducer,

  // Users
  currentUser,

  // Projects
  revolvingProjects,

  // Assignments
  revolvingAssignments,
  destroyedAssignments
})

export default rootReducer
