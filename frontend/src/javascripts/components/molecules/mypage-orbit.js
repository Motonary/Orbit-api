import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import FixedStarInList from '../atoms/fixed-star-in-list'
import { setCurrentProject } from '../../actions/projects'
import { setModalStatus } from '../../actions/common'

class MypageOrbit extends Component {
  componentDidMount() {
    this.setDrop()
  }

  setDrop() {
    //Droppable area
    const target = document.getElementById('mypage-orbit-circle')

    //Entering into the droppable area
    target.addEventListener(
      'dragenter',
      () => {
        if (!target.classList.contains('circle-shadow')) {
          target.classList.add('circle-shadow')
        }
      },
      false
    )

    //Leaving from the droppable area
    target.addEventListener(
      'dragleave',
      () => {
        if (target.classList.contains('circle-shadow')) {
          target.classList.remove('circle-shadow')
        }
      },
      false
    )

    //Over the droppable area
    target.addEventListener(
      'dragover',
      event => {
        event.preventDefault()
      },
      false
    )

    //Drop
    target.addEventListener(
      'drop',
      event => {
        event.preventDefault()
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

  onClickFixedStar(projectId) {
    // TODO: プロジェクトページへ遷移する前になんらかのアニメーション追加(Fadeoutとか)
    this.props.setCurrentProject(
      this.props.revolvingProjects[projectId],
      () => {
        this.props.history.push(`${this.props.match.url}/projects`)
      }
    )
  }

  render() {
    const { revolvingProjects } = this.props
    if (!revolvingProjects) return <ul id="mypage-orbit-circle" />

    const pos = ['top', 'right', 'left', 'bottom']
    const projectList = _.map(revolvingProjects, (project, index) => {
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
    })

    return <ul id="mypage-orbit-circle">{projectList}</ul>
  }
}

export default connect(
  ({ revolvingProjects }) => ({ revolvingProjects }),
  { setCurrentProject, setModalStatus }
)(MypageOrbit)
