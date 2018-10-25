import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { JWT } from '../../constants'
import { fetchAllProjects, createProject, destroyProject } from '../../actions/projects'
import ImgUser from '../../../images/main/user_default_icon.png'

class MyPage extends Component {
  componentDidMount() {
    // TODO: 最初ログインした時Projectが設定されないバグ修正
    if (JWT) this.props.fetchAllProjects()
  }

  onClickFixedStar(projectId) {
    // TODO: プロジェクトページへ遷移する前になんらかのアニメーション追加(Fadeoutとか)
    this.props.history.push(`${this.props.match.url}/projects/${projectId}`)
  }

  onDropFixedStar(starType, e) {
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

    // ProjectStateの変化を見やすくするための暫定的なテーブル。
    var { projects } = this.props
    if (!projects) projects = []
    const projectTable = projects.map(project => {
      return(
        <tr key={project.id}>
          <td>{project.id}</td>
          <td>{project.title}</td>
          <td>{project.fixed_star_type}</td>
        </tr>
      )
    })

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
        <div className="orbit-circle">
          <div className="common top mypage-orbit-motion">
            <div
              className="planet-large-2 bg-color"
              onClick={this.onClickFixedStar.bind(this, 1 /* 仮デフォルト引数 */)}
            ></div>
          </div>
        </div>
      </div>
  )
  }
}

function mapStateToProps({currentUser, projects}) {
  return { currentUser, projects }
}

export default connect(
  mapStateToProps,
  { fetchAllProjects, createProject, destroyProject }
)(MyPage)
