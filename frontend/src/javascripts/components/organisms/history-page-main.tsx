import * as React from 'react'
import { connect } from 'react-redux'
import { fetchDestroyedAssignments, restoreAssignment } from '../../actions/assignments'
import { PlanetImgs } from '../../constants/images'

interface Props {
  destroyedAssignments: any
  fetchDestroyedAssignments: any
  restoreAssignment: any
}

class HistoryPageMain extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.fetchDestroyedAssignments()
  }

  componentDidUpdate() {
    const canvas: any = document.getElementById('sample1')
    if (canvas.getContext) {
      this.sample()
    }
  }

  renderDestroyedAssignments(eachAssignment: any) {
    return <li key={eachAssignment.id}>{eachAssignment.title}</li>
  }

  onRestoreAssignment(assignmentId: any) {
    this.props.restoreAssignment(assignmentId)
  }

  renderStoredPlanetList() {
    return PlanetImgs.map((planetImg: any) => {
      return (
        <li key={planetImg} className="planet">
          <img src={planetImg} className="stored-planet" />
        </li>
      )
    })
  }

  sample() {
    // 描画コンテキストの取得
    const canvas: any = document.getElementById('sample1')
    if (canvas.getContext) {
      const context = canvas.getContext('2d')
      context.strokeStyle = '#FFF'

      context.beginPath()
      context.moveTo(50, 20)

      // 座標を指定してラインを引いていく
      context.lineTo(250, 20)
      context.arc(250, 50, 30, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, false)
      context.moveTo(250, 80)
      context.lineTo(50, 80)
      context.arc(50, 110, 30, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, true)
      context.moveTo(50, 140)
      context.lineTo(250, 140)
      context.arc(250, 170, 30, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, false)
      // 現在のパスを輪郭表示する
      context.stroke()
    }
  }

  render() {
    const { destroyedAssignments } = this.props
    if (!destroyedAssignments) return <div>Loading...</div>

    return (
      <div id="history-container">
        <canvas id="background-liner" />
        {/*<a onClick={this.onRestoreAssignment.bind(this, 7)}>RESTORE</a>*/}
        {/*<div>{destroyedAssignments.map(this.renderDestroyedAssignments)}</div>*/}
        <ul id="stored-planet-list" />
      </div>
    )
  }
}

export default connect(
  ({ destroyedAssignments }: any) => ({ destroyedAssignments }),
  { fetchDestroyedAssignments, restoreAssignment }
)(HistoryPageMain)
