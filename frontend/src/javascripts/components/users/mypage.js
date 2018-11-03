import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import { JWT } from '../../constants'

import MypageOrbit from '../molecules/mypage-orbit'
import { fetchRevolvingProjects, setCurrentProject,  createProject, destroyProject } from '../../actions/projects'

import ImgUser from '../../../images/main/user_default_icon.png'

class MyPage extends Component {
  componentDidMount() {
    // TODO: 最初ログインした時Projectが設定されないバグ修正
    console.log(JWT)
    if (JWT) this.props.fetchRevolvingProjects()
  }

  onDropFixedStar(starType, e) {
    //TODO: こいつの設定
    if (e.keyCode === 13) {
      this.props.createProject(e.target.value, starType , projectId => {
        this.props.history.push(`${this.props.match.url}/projects/${projectId}`)
      })
    }
  }

  onDestroyFixedStar(projectId = 1 /* 仮デフォルト引数 */) {
    this.props.destroyProject(projectId)
  }

  render() {
    const { currentUser } = this.props
    if (!currentUser) return <div>Loading....</div>

    if (currentUser.id != this.props.match.params.userId) {
      return <Redirect to={`/users/${currentUser.id}`} />
    }
    console.log(this.props)

    //TODO: 歪みが子要素まで反映されているので親要素のみに留められないか
    return(
      <div id="project-list">
        <div id="user-info">
          <div className="user-img-container">
            <img src={ImgUser} className="user-img" />
          </div>
          <div className="user-name">
            <span>WELCOME</span><br />
            {currentUser.name}
          </div>
        </div>
        <MypageOrbit />
      </div>
    )
  }
}

export default connect(
  ({ currentUser, revolvingProjects }) => ({ currentUser, revolvingProjects }),
  { fetchRevolvingProjects, setCurrentProject, createProject, destroyProject }
)(MyPage)
