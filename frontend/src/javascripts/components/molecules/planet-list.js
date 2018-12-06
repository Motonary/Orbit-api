import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import Planet from '../atoms/planet'
import { setSelectedStar } from '../../actions/common'

const dragSpec = {
  // dragが始まったときの処理
  beginDrag(props) {
    // dragされ始めたら自分のidを返す
    const { id } = props
    return { id }
  },

  // dragが終わったときの処置
  endDrag(props, monitor) {
    // beginDragで返されたidを取ってくる
    const source = monitor.getItem()
    // dropSpecのdropで返されたidを取ってくる
    const target = monitor.getDropResult()
    // dropActionを発火させる
    if (target) props.dropAction(source.id, target.id)
  },
}

@DragSource(props => props.type, dragSpec, connect => ({
  connectDragSource: connect.dragSource(),
}))
class PlanetList extends Component {
  // static propTypes = {
  //  connectDragSource: React.PropTypes.func.isRequired,
  // dropAction: React.PropTypes.func.isRequired,
  //id: React.PropTypes.string.isRequired,
  //}

  constructor(props) {
    super(props)

    this.state = {
      clickedStar: null,
    }
  }

  onClickSelectStar(star_type, e) {
    const form_balloon = document.getElementById('form-balloon')
    const prev_target = this.state.clickedStar
    const target = e.target.parentNode

    if (prev_target) {
      prev_target.classList.remove('current-clicked')
    }
    target.classList.add('current-clicked')

    this.setState({ clickedStar: target })

    this.props.setSelectedStar(star_type)
    form_balloon.style.display = 'block'
  }

  render() {
    const { connectDragSource, planetType } = this.props

    return connectDragSource(
      <li
        id={planetType}
        className="planet draggable-element"
        draggable={true}
        onClick={this.onClickSelectStar.bind(this, planetType)}
      >
        <Planet className="planet-img" planetType={planetType} />
      </li>
    )
  }
}

export default connect(
  null,
  { setSelectedStar }
)(PlanetList)
