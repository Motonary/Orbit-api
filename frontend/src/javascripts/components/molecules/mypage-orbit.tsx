import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PopupBox from '../atoms/popup-box'
import Planet from '../molecules/planet'

import { setCurrentProject, fetchRevolvingProjects } from '../../actions/projects'
import { setModalStatus } from '../../actions/common'

interface MypageOrbitProps {
  history: any
  match: any

  modalOpen: any
  revolvingProjects: any

  setModalStatus: any
  setCurrentProject: any
  fetchRevolvingProjects: any
}

class MypageOrbit extends React.Component<MypageOrbitProps, {}> {
  componentDidMount() {
    this.setDrop()
    if (!this.props.revolvingProjects) this.props.fetchRevolvingProjects()
  }

  setDrop() {
    // Droppable area
    const target = document.getElementById('mypage-circle')

    // Entering into the droppable area
    target.addEventListener(
      'dragenter',
      () => {
        if (!target.classList.contains('circle-shadow')) {
          target.classList.add('circle-shadow')
        }
      },
      false
    )

    // Leaving from the droppable area
    target.addEventListener(
      'dragleave',
      () => {
        if (target.classList.contains('circle-shadow')) {
          target.classList.remove('circle-shadow')
        }
      },
      false
    )

    // Over the droppable area
    target.addEventListener(
      'dragover',
      (e: any) => {
        e.preventDefault()
      },
      false
    )

    // Drop
    target.addEventListener(
      'drop',
      (e: any) => {
        e.preventDefault()
        if (target.classList.contains('circle-shadow')) {
          target.classList.remove('circle-shadow')
        }
        if (!this.props.modalOpen) {
          this.props.setModalStatus('form-project')
        }
      },
      false
    )
  }

  onClickProjectPlanet(projectId: string) {
    // TODO: プロジェクトページへ遷移する前になんらかのアニメーション追加(Fadeoutとか)
    this.props.setCurrentProject(this.props.revolvingProjects[projectId], () => {
      this.props.history.push(`${this.props.match.url}/projects`)
    })
  }

  render() {
    const { revolvingProjects }: any = this.props
    if (!revolvingProjects) {
      return (
        <div id="mypage-orbit">
          <div id="mypage-circle" className="common-circle" />
        </div>
      )
    }

    const pos: any = ['top', 'right', 'left', 'bottom']
    const projectList: any = _.map(revolvingProjects, (project: any, index: any) => {
      return (
        <div
          key={project.id}
          className={`mypage-common ${pos[index % 4]} mypage-orbit-motion start-animation`}
        >
          <div
            id={`planet-${project.id}-${project.fixed_star_type}`}
            className="mypage-planet"
            onClick={this.onClickProjectPlanet.bind(this, project.id)}
          >
            <PopupBox data={project} isProject={true} />
            <Planet className="planet-img-container" planetType={project.fixed_star_type} />
          </div>
        </div>
      )
    })

    return (
      <div id="mypage-orbit">
        <div id="mypage-circle" className="common-circle">
          {projectList}
        </div>
      </div>
    )
  }
}

export default connect(
  ({ revolvingProjects, modalOpen }: any) => ({ revolvingProjects, modalOpen }),
  { setModalStatus, setCurrentProject, fetchRevolvingProjects }
)(MypageOrbit)
