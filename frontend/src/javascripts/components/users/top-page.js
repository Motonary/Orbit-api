import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { JWT } from '../../constants'
import { fetchAllProjects, createProject, destroyProject } from '../../actions/projects'

class TopPage extends Component {
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
      <div>
        <div id="system">
          <div id="fixed-star"></div>
          <div className="circle2 common-circle">
            <div className="common top second-orbit-motion">
              <div
                className="planet-medium-2 bg-color"
                onClick={this.onClickFixedStar.bind(this, 1 /* 仮デフォルト引数 */)}
              ></div>
            </div>
          </div>
        </div>

        <input
          className="form-control"
          onKeyDown={this.onDropFixedStar.bind(this, 1 /* 仮デフォルト引数 */)}
          placeholder="Type title and press enter key"
         />
         {/* ProjectStateの変化を見やすくするための簡易的なテーブル。 */}
        <table border="2" className="text-danger">
          <thead>
            <tr>
              <th>ID</th>
              <th>タイトル</th>
              <th>恒星ID</th>
            </tr>
          </thead>
          <tbody>
            {projectTable}
          </tbody>
        </table>
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
)(TopPage)
