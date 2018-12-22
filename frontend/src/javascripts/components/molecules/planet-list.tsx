import * as React from 'react'
import { connect } from 'react-redux'

import Planet from './planet'

import { setSelectedStar, resetSelectedStar } from '../../actions/common'

interface PlanetListProps {
  planetType: string

  selectedStar: any

  setSelectedStar: any
  resetSelectedStar: any
}

class PlanetList extends React.Component<PlanetListProps, {}> {
  componentDidMount() {
    this.setDragnDrop()
  }

  setDragnDrop() {
    // Draggable Element
    const target = document.getElementById(this.props.planetType)

    // Start of dragging
    target.addEventListener(
      'dragstart',
      () => {
        this.props.setSelectedStar(this.props.planetType)
      },
      false
    )

    // During dragging
    // target.addEventListener('drag', () => {}, false)

    // End of dragging
    // target.addEventListener('dragend', () => {}, false)
  }

  render() {
    const { planetType } = this.props

    return (
      <li id={planetType} className="planet" draggable={true}>
        <Planet className="planet-img" planetType={planetType} />
      </li>
    )
  }
}

export default connect(
  ({ selectedStar }: any) => ({ selectedStar }),
  { setSelectedStar, resetSelectedStar }
)(PlanetList)
