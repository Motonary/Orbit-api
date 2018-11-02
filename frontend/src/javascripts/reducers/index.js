import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import currentUser from './current-user'
import { revolvingProjects } from './projects'
import { revolvingAssignments, destroyedAssignments, selectedAssignments } from './assignments'
import { modalIsOpen } from './common'

const rootReducer = combineReducers({
  // Form
  form: formReducer,

  // Users
  currentUser,

  // Projects
  revolvingProjects,

  // Assignments
  revolvingAssignments,
  destroyedAssignments,
  selectedAssignments,
  modalIsOpen
})

export default rootReducer
