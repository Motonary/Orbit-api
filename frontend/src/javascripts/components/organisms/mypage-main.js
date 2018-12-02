import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import MypageUserInfo from '../molecules/mypage-user-info'
import MypageOrbit from '../molecules/mypage-orbit'
import { fetchRevolvingProjects, createProject } from '../../actions/projects'

class MyPage extends Component {
  componentDidMount() {
    if (sessionStorage.getItem('jwt')) this.props.fetchRevolvingProjects()
  }

  // onDropFixedStar(starType, e) {
  //   //TODO: こいつの設定
  //   if (e.keyCode === 13) {
  //     this.props.createProject(e.target.value, starType, projectId => {
  //       this.props.history.push(`${this.props.match.url}/projects/${projectId}`)
  //     })
  //   }
  // }

  // onDestroyFixedStar(projectId = 1 /* 仮デフォルト引数 */) {
  //   this.props.destroyProject(projectId)
  // }

  render() {
    const { currentUser, match, history } = this.props
    if (!currentUser) return <div>Loading....</div>

    if (currentUser.id != match.params.userId) {
      return <Redirect to={`/users/${currentUser.id}`} />
    }

    //TODO: 歪みが子要素まで反映されているので親要素のみに留められないか
    return (
      <div id="project-list">
        <MypageUserInfo currentUser={currentUser} />
        <MypageOrbit history={history} match={match} />
      </div>
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser }),
  { fetchRevolvingProjects, createProject }
)(MyPage)
