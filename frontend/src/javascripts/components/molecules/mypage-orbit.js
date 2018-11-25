import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import FixedStar from '../atoms/fixed-star'
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
        <FixedStar
          key={project.id}
          project={project}
          pos={pos[index - 1]}
          onClick={this.onClickFixedStar.bind(this, project.id)}
        />
      )
    })

    return <div className="orbit-circle">{projectList}</div>
  }
}

export default connect(
  ({ revolvingProjects }) => ({ revolvingProjects }),
  { setCurrentProject }
)(MypageOrbit)
