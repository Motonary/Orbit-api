import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import FixedStarInList from '../atoms/fixed-star-in-list'
import { setCurrentProject } from '../../actions/projects'

interface Props {
  history: any,
  match: any,

  revolvingProjects: any,
  setCurrentProject: any,
}

class MypageOrbit extends React.Component<Props, {}> {
  onClickFixedStar(projectId: any) {
    // TODO: プロジェクトページへ遷移する前になんらかのアニメーション追加(Fadeoutとか)
    this.props.setCurrentProject(
      this.props.revolvingProjects[projectId],
      () => {
        this.props.history.push(`${this.props.match.url}/projects`)
      }
    )
  }

  render() {
    const { revolvingProjects }: any = this.props
    if (!revolvingProjects) return <div>Loading...</div>

    const pos: any = ['top', 'right', 'left', 'bottom']
    const projectList: any = _.map(revolvingProjects, (project: any, index: any) => {
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
  ({ revolvingProjects }: any) => ({ revolvingProjects }),
  { setCurrentProject }
)(MypageOrbit)
