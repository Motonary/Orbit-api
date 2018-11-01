import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import currentUser from './current-user'
<<<<<<< HEAD
import { revolvingProjects, projectsOnBar } from './projects'
import { revolvingAssignments, destroyedAssignments } from './assignments'
=======
import projects from './projects'
import { revolvingAssignments, destroyedAssignments, selectedAssignments } from './assignments'
import { modalIsOpen } from './common'
>>>>>>> 620574867789f889848c4343e6a682e7e483acfb

const rootReducer = combineReducers({
  // Form
  form: formReducer,

  // Users
  currentUser,

  // Projects
  revolvingProjects,
  projectsOnBar,

  // Assignments
  revolvingAssignments,
  destroyedAssignments,
  selectedAssignments,
  modalIsOpen
})

export default rootReducer
