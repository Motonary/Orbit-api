import { combineReducers } from 'redux'
import currentUser from './current-user'
import { revolvingProjects, currentProject, selectedProject } from './projects'
import { revolvingAssignments, destroyedAssignments, selectedAssignments } from './assignments'
import { selectedStar, selectedDestroyAction, modalOpen } from './common'

const rootReducer = combineReducers({
  // commmon
  selectedStar,
  selectedDestroyAction,
  modalOpen,

  // Users
  currentUser,

  // Projects
  revolvingProjects,
  currentProject,
  selectedProject,

  // Assignments
  revolvingAssignments,
  destroyedAssignments,
  selectedAssignments,
})

export default rootReducer
