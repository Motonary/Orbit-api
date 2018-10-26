import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchRevolvingAssignments,
         createAssignment,
         destroyAssignment } from '../../actions/assignments'

class ProjectPage extends Component {
  constructor(props) {
    super(props)
    // DRYにするためstateで定義
    this.state = {
      userId: props.match.params.userId,
      projectId: props.match.params.projectId
    }
  }

  componentDidMount() {
    this.props.fetchRevolvingAssignments(this.state.projectId)
  }

  onClickPlanet() {
    // TODO: タスク詳細のポップアップ実装,
  }

  onDropPlanet(title, detail, deadline, planet_type, planet_size, orbit_pos) {
    this.props.createAssignment(
      title, detail, deadline, planet_type, planet_size, orbit_pos, this.state.projectId
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

    if (currentUser.id != this.state.userId) {
      const correctPath = `/users/${currentUser.id}`
      return <Redirect to={correctPath} />
    }

    return(
      <div>
        {/*-----------------------------T E S T---------------------------------------*/}
        <a
          className="text-danger"
          onClick={this.onDropPlanet.bind(this, "A", "B", null, 2, 2, 2)}
        >CREATE | </a>
        <a className="text-danger" onClick={this.onDestroyPlanet.bind(this, 7)}>DESTROY</a>
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
  ({ currentUser, revolvingAssignments }) => ({ currentUser, revolvingAssignments }),
  { fetchRevolvingAssignments, createAssignment, destroyAssignment }
)(ProjectPage)
