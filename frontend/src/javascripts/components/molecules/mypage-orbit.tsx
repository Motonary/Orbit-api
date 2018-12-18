import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import FixedStarInList from '../atoms/fixed-star-in-list'
import { setCurrentProject } from '../../actions/projects'
import { setModalStatus } from '../../actions/common'

interface MypageOrbitProps {
  history: any
  match: any

  modalOpen: any
  revolvingProjects: any

  setModalStatus: any
  setCurrentProject: any
}

class MypageOrbit extends React.Component<MypageOrbitProps, {}> {
  componentDidMount() {
    this.setDrop()
  }

  setDrop() {
    // Droppable area
    const target = document.getElementById('mypage-orbit-circle')

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
          this.props.setModalStatus('form')
        }
      },
      false
    )
  }

  onClickFixedStar(projectId: any) {
    // TODO: プロジェクトページへ遷移する前になんらかのアニメーション追加(Fadeoutとか)
    console.log(this.props.match.url, projectId)
    this.props.setCurrentProject(
      this.props.revolvingProjects[projectId],
      () => {
        this.props.history.push(`${this.props.match.url}/projects`)
      }
    )
  }

  render() {
    const { revolvingProjects }: any = this.props
    if (!revolvingProjects) return <ul id="mypage-orbit-circle" />

    const pos: any = ['top', 'right', 'left', 'bottom']
    const projectList: any = _.map(
      revolvingProjects,
      (project: any, index: any) => {
        return (
          <div
            key={project.id}
            className={`common ${
              pos[index % 4]
            } mypage-orbit-motion start-animation`}
          >
            <FixedStarInList
              key={project.id}
              project={project}
              className="planet-large-secundus"
              onClick={this.onClickFixedStar.bind(this, project.id)}
            />
          </div>
        )
      }
    )

    return <ul id="mypage-orbit-circle">{projectList}</ul>
  }
}

export default connect(
  ({ revolvingProjects, modalOpen }: any) => ({ revolvingProjects, modalOpen }),
  { setCurrentProject, setModalStatus }
)(MypageOrbit)
