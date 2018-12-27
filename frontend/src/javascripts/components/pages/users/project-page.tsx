import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { fetchRevolvingAssignments } from '../../../actions/assignments'
import { fetchRevolvingProjects, setDefaultProject } from '../../../actions/projects'

import Header from '../../organisms/header'
import ProjectPageMain from '../../organisms/project-page-main'
import Footer from '../../organisms/footer'

interface Props {
  currentUser: any
  currentProject: any
  history: any
  match: any
  location: any
  revolvingProjects: any
  fetchRevolvingAssignments: any
  fetchRevolvingProjects: any
  setDefaultProject: any
}

class ProjectPage extends React.Component<Props, {}> {
  componentDidMount() {
    const { currentProject, revolvingProjects } = this.props
    // TODO: リファクタリング
    if (currentProject) {
      this.props.fetchRevolvingAssignments(currentProject.id)
    } else if (revolvingProjects) {
      this.props.setDefaultProject(revolvingProjects[Object.keys(revolvingProjects)[0]])
    } else {
      this.props.fetchRevolvingProjects().then(() => {
        const { revolvingProjects } = this.props
        if (revolvingProjects) {
          this.props.setDefaultProject(
            revolvingProjects[Object.keys(revolvingProjects)[0]],
            (defaultProjectId: any) => this.props.fetchRevolvingAssignments(defaultProjectId)
          )
        }
      })
    }
  }

  render() {
    const {
      currentUser,
      currentProject,
      history,
      match,
      location: { pathname },
    } = this.props

    if (!currentUser) return <div>Loading....</div>

    if (currentUser.id !== parseInt(match.params.userId, 10)) {
      const correctPath = `/users/${currentUser.id}`
      return <Redirect to={correctPath} />
    }

    if (!currentProject) return <div>Loading....</div>

    return (
      <div id="project-page-container">
        <Header currentUser={currentUser} history={history} pathname={pathname} />
        <ProjectPageMain currentProject={currentProject} />
        <Footer currentUser={currentUser} pathname={pathname} history={history} />
      </div>
    )
  }
}

export default connect(
  ({ currentUser, revolvingProjects, currentProject }: any) => ({
    currentUser,
    revolvingProjects,
    currentProject,
  }),
  {
    fetchRevolvingAssignments,
    fetchRevolvingProjects,
    setDefaultProject,
  }
)(ProjectPage)
