import * as React from 'react'
import { PlanetImgs } from '../../constants/images'

interface Props {
  fixedStarType: any
}

export default class FixedStar extends React.Component<Props, {}> {
  addSatelitePlanet() {
    const conditional_class1: any = document.getElementsByClassName(
      'secundus-orbit-motion'
    )
    const conditional_class2: any = document.getElementsByClassName(
      'tertius-orbit-motion'
    )
    const target_class: any = document.getElementsByClassName('planet-large-primo')
    const target_width: any = 1.5 * target_class[0].getBoundingClientRect().width

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
