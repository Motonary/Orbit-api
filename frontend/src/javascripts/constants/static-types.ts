// ----------------------------------------------------------
// BaseAction
// ----------------------------------------------------------
export interface BaseAction {
  type: string
  payload?: any
}

// ----------------------------------------------------------
// StoreState
// ----------------------------------------------------------

// Assignments
export interface RevolvingAssignmentsState {
  primo?: Array<Object | null>
  secundus?: Array<Object | null>
  tertius?: Array<Object | null>
}

export type SelectedAssignmentsState = Array<Object | null>

export type DestroyedAssignmentsState = Array<any>

// Projects
export type SelectedProjectsAction = Array<any>
