import React, { Component } from 'react'
import { connect } from 'react-redux'
import Planet from '../atoms/planet'
import { setSelectedStar } from '../../actions/common'

class PlanetList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clickedStar: null,
    }
  }

  componentDidMount() {
    this.setDragnDrop()
  }

  setDragnDrop() {
    //Draggable Element
    const target = document.getElementById(this.props.planetType)

    //Start of dragging
    target.addEventListener('dragstart', () => {}, false)

    //During dragging
    target.addEventListener('drag', () => {}, false)

    //End of dragging
    target.addEventListener('dragend', () => {}, false)
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
    const { planetType } = this.props

    return (
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
