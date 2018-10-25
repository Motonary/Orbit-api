import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchAllAssignments, createAssignment, destroyAssignment } from '../../actions/assignments'

class ProjectPage extends Component {
  componentDidMount() {
    this.props.fetchAllAssignments(this.props.match.params.projectId)
  }

  onClickPlanet() {
    // TODO: タスク詳細のポップアップ実装,
  }

  onDropPlanet(title, detail, deadline, planet_type, planet_size, orbit_pos) {
    this.props.createAssignment(
      title, detail, deadline, planet_type, planet_size, orbit_pos, this.props.match.params.projectId
    )
  }

  onDestroyPlanet(assignmentId) {
    this.props.destroyAssignment(assignmentId)
  }

  render() {
    const { currentUser } = this.props
    if (!currentUser) {
      return <div>Loading....</div>
    }

    if (currentUser.id != this.props.match.params.userId) {
      const correctPath = `/users/${currentUser.id}`
      return <Redirect to={correctPath} />
    }

    console.log(this.props.allAssignments) // current_projectに結びつくassignments確認用
    return(
      <div>
        {/*-----------------------------T E S T---------------------------------------*/}
        <a
          className="text-danger"
          onClick={this.onDropPlanet.bind(this, "A", "B", null, 2, 2, 2)}
        >CREATE</a>
        <a className="text-danger" onClick={this.onDestroyPlanet.bind(this, 2)}>DESTROY</a>
        {/*---------------------------------------------------------------------------*/}
        <div id="system">
          <div id="fixed-star"></div>
          <div className="circle1 common-circle">
            <div className="common bottom first-orbit-motion">
              <div className="planet-large-1 bg-color"></div>
            </div>
            <div className="common top first-orbit-motion">
              <div className="planet-large-1 bg-color"></div>
            </div>
          </div>
          <div className="circle2 common-circle">
            <div className="common top second-orbit-motion">
              <div className="planet-medium-2 bg-color"></div>
              <div className="satelite-orbit">
                <div className="common top satelite-orbit-motion">
                  <div className="satelite bg-color"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="circle3 common-circle">
            <div className="common right third-orbit-motion">
              <div className="planet-small-3 bg-color"></div>
              <div className="satelite-orbit">
                <div className="common top satelite-orbit-motion">
                  <div className="satelite bg-color"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ currentUser, allAssignments }) => ({ currentUser, allAssignments }),
  { fetchAllAssignments, createAssignment, destroyAssignment }
)(ProjectPage)
