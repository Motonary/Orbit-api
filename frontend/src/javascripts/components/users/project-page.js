import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchRevolvingAssignments,
         createAssignment,
         destroyAssignment } from '../../actions/assignments'
import { PlanetImgs } from './planet-img';

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

  addSatelitePlanet() {
    const conditional_class1 = document.getElementsByClassName("second-orbit-motion")
    const conditional_class2 = document.getElementsByClassName("third-orbit-motion")
    const target_class = document.getElementsByClassName("planet-large-1")
    const target_width = target_class[0].getBoundingClientRect().width

    if(conditional_class1[0].children[1].classList.contains("satelite-orbit")){
      conditional_class1[0].children[1].style.width = target_width + "px"
      conditional_class1[0].children[1].style.height = target_width + "px"
      conditional_class2[0].children[1].style.width = target_width + "px"
      conditional_class2[0].children[1].style.height = target_width + "px"
    }
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
      <div id="project-orbit">
        <div id="fixed-star" onClick={this.addSatelitePlanet.bind(this)}><img src={PlanetImgs[0]} /></div>
        <div className="circle1 common-circle">
          <div className="common bottom first-orbit-motion">
            <div className="planet-large-1"><img src={PlanetImgs[3]} /></div>
          </div>
          <div className="common top first-orbit-motion">
            <div className="planet-large-1"><img src={PlanetImgs[5]} /></div>
          </div>
        </div>
        <div className="circle2 common-circle">
          <div className="common top second-orbit-motion">
            <div className="planet-medium-2"><img src={PlanetImgs[7]} /></div>
            <div className="satelite-orbit">
              <div className="common top satelite-orbit-motion">
                <div className="satelite"><img src={PlanetImgs[13]} /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="circle3 common-circle">
          <div className="common right third-orbit-motion">
            <div className="planet-small-3"><img src={PlanetImgs[10]} /></div>
            <div className="satelite-orbit">
              <div className="common top satelite-orbit-motion">
                <div className="satelite"><img src={PlanetImgs[14]} /></div>
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
