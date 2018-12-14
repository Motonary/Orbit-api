import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import currentUser from './current-user'
import { revolvingProjects, currentProject } from './projects'
import {
  revolvingAssignments,
  destroyedAssignments,
  selectedAssignments,
} from './assignments'
import { selectedStar, isDestroyIgnited, modalOpen } from './common'

const rootReducer = combineReducers({
  // Form
  form: reduxFormReducer,

  //commmon
  selectedStar,
  isDestroyIgnited,

  // Users
  currentUser,

  // Projects
  revolvingProjects,
  currentProject,
  //selectedProjects,

  // Assignments
  revolvingAssignments,
  destroyedAssignments,
  selectedAssignments,
  modalOpen,
})

export default rootReducer
