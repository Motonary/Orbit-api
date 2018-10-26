import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import currentUser from './current-user'
import projects from './projects'
import { revolvingAssignments, destroyedAssignments } from './assignments'

const rootReducer = combineReducers({
  form: formReducer,
  currentUser,
  projects,
  revolvingAssignments,
  destroyedAssignments
})

export default rootReducer
