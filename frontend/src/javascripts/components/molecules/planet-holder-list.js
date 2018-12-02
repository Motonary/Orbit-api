import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PlanetImgs } from '../../constants/images'
import Planet from '../atoms/planet'
import { setSelectedStar } from '../../actions/common'

class PlanetHolderList extends Component {
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
    const planetList = Object.keys(PlanetImgs).map(key => {
      return (
        <li
          key={key}
          className="planet"
          onClick={this.onClickSelectStar.bind(this, key)}
        >
          <Planet className="planet-img" planetType={key} />
        </li>
      )
    })

    return <ul id="planet-list">{planetList}</ul>
  }
}

export default connect(
  null,
  { setSelectedStar }
)(PlanetHolderList)
