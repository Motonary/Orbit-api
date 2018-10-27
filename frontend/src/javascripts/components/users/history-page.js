import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDestroyedAssignments, restoreAssignment } from '../../actions/assignments'
import { PlanetImgs } from '../../constants'

class HistoryPage extends Component {
  componentDidMount() {
    this.props.fetchDestroyedAssignments()
  }

  renderDestroyedAssignments(eachAssignment) {
    return <div key={eachAssignment.id}>{eachAssignment.title}</div>
  }

  onRestoreAssignment(assignmentId) {
    this.props.restoreAssignment(assignmentId)
  }
  renderTest() {
    return ({

    })
  }
  renderStoredPlanetList() {
    return (
      PlanetImgs.map((planetImg) => {
        return (
          <li key={planetImg} className="planet"><img src={planetImg} className="stored-planet" /></li>
        )
      })
    )
  }

  render() {
    const { destroyedAssignments } = this.props
    if (!destroyedAssignments) return <div>Loading...</div>

    var list = []
    let lists = []

    function test(i){
      for(let j=0; j<5; j++){
        list.push(<li className="planet"><img src={PlanetImgs[i+j]} className="stored-planet" /></li>)
      }
    }

    for(let i=0; i<3; i++){
      test(i)
      lists.push(<div className="planet-list-row">{list}</div>)
      list.length = 0
    }



    return(
      <div id="history-container">
        {/*<a onClick={this.onRestoreAssignment.bind(this, 7)}>RESTORE</a>*/}
        {/*<div>{destroyedAssignments.map(this.renderDestroyedAssignments)}</div>*/}
        <ul id="stored-planet-list">
          { lists }
        </ul>
      </div>
    )
  }
}

export default connect(
  ({ destroyedAssignments }) => ({ destroyedAssignments }),
  { fetchDestroyedAssignments, restoreAssignment }
)(HistoryPage)
