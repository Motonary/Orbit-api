import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import currentUser from './current-user'
import { revolvingProjects, currentProject, selectedProjects } from './projects'
import { revolvingAssignments, destroyedAssignments, selectedAssignments } from './assignments'
import { selectedStar, isDestroyIgnited, modalIsOpen } from './common'

const rootReducer = combineReducers({
  // Form
  form: formReducer,

  //commmon
  selectedStar,
  isDestroyIgnited,

  // Users
  currentUser,

  // Projects
  revolvingProjects,
  currentProject,
  selectedProjects,

  // Assignments
  revolvingAssignments,
  destroyedAssignments,
  selectedAssignments,
  modalIsOpen
})

export default rootReducer
