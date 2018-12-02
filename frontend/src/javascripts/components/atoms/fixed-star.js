import React, { Component } from 'react'
import { PlanetImgs } from '../../constants/images'

export default class FixedStar extends Component {
  addSatelitePlanet() {
    const conditional_class1 = document.getElementsByClassName(
      'secundus-orbit-motion'
    )
    const conditional_class2 = document.getElementsByClassName(
      'tertius-orbit-motion'
    )
    const target_class = document.getElementsByClassName('planet-large-primo')
    const target_width = 1.5 * target_class[0].getBoundingClientRect().width

    if (
      conditional_class1[0].children[1].classList.contains('satelite-orbit')
    ) {
      conditional_class1[0].children[1].style.width = target_width + 'px'
      conditional_class1[0].children[1].style.height = target_width + 'px'
      conditional_class2[0].children[1].style.width = target_width + 'px'
      conditional_class2[0].children[1].style.height = target_width + 'px'
    }
  }

  render() {
    return (
      <div id="fixed-star" onClick={this.addSatelitePlanet.bind(this)}>
        <img src={PlanetImgs[this.props.fixedStarType]} />
      </div>
    )
  }
}
