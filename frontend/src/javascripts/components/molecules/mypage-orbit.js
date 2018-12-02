import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import FixedStarInList from '../atoms/fixed-star-in-list'
import { setCurrentProject } from '../../actions/projects'

class MypageOrbit extends Component {
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
    if (!revolvingProjects) return <div>Loading...</div>

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

    return <ul className="orbit-circle">{projectList}</ul>
  }
}

export default connect(
  ({ revolvingProjects }) => ({ revolvingProjects }),
  { setCurrentProject }
)(MypageOrbit)
