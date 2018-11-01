import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import currentUser from './current-user'
import projects from './projects'
import { revolvingAssignments, destroyedAssignments, selectedAssignments } from './assignments'
import { modalIsOpen } from './common'

const rootReducer = combineReducers({
  form: formReducer,
  currentUser,
  projects,
  revolvingAssignments,
  destroyedAssignments,
  selectedAssignments,
  modalIsOpen
})

export default rootReducer
