import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { PlanetImgs } from '../../constants'

class MypageOrbit extends Component {

  constructor(props) {
    super(props)
  }

  onClickFixedStar(projectId) {
    // TODO: プロジェクトページへ遷移する前になんらかのアニメーション追加(Fadeoutとか)
    this.props.setCurrentProject(this.props.revolvingProjects[projectId], () => {
      this.props.history.push(`${this.props.match.url}/projects`)
    })
  }

  renderProjectList() {
    const pos = ['top', 'right', 'left', 'bottom']
    let i=-1

    if (!this.props.revolvingProjects) { return <div>Loading</div> }
    return (
      _.map(this.props.revolvingProjects, (project) => {
        ++i
        return(
          <div key={project.id} className={`common ${pos[i]} mypage-orbit-motion start-animation`}>
            <div className="planet-large-secundus" onClick={this.onClickFixedStar.bind(this, project.id)}>
              <img src={PlanetImgs[project.fixed_star_type]} />
            </div>
          </div>
        )
      })
    )
  }

  render() {
    return(
      <div className="orbit-circle">
        { this.renderProjectList() }
      </div>
    )
  }
}

export default connect(({revolvingProjects}) => ({revolvingProjects}))(MypageOrbit)
