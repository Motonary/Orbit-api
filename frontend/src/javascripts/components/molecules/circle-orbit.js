import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PopupBox from '../atoms/popup-box'
import Planet from '../atoms/planet'

import {
  selectAssignment,
  disselectAssignment,
} from '../../actions/assignments'
import {
  setSelectedStar,
  resetSelectedStar,
  setModalStatus,
} from '../../actions/common'

class CircleOrbit extends Component {
  componentDidMount() {
    this.setOrbitDrop()
    this.setPlanetDrop()
  }

  setPlanetDrop() {
    //Droppable area
    _.forEach(this.props.revolvingAssignments, assignment => {
      const target = document.getElementById(
        `${assignment.id}-${assignment.planet_type}`
      ).parentNode
      target.addEventListener(
        'dragenter',
        () => {
          if (!target.classList.contains('circle-shadow')) {
            target.classList.add('circle-shadow')
          }
        },
        false
      )

      //Entering into the droppable area
      target.addEventListener(
        'dragenter',
        () => {
          if (!target.classList.contains('circle-shadow')) {
            target.classList.add('circle-shadow')
          }
        },
        false
      )

      //Leaving from the droppable area
      target.addEventListener(
        'dragleave',
        () => {
          if (target.classList.contains('circle-shadow')) {
            target.classList.remove('circle-shadow')
          }
        },
        false
      )

      //Drop
      target.addEventListener(
        'drop',
        e => {
          e.preventDefault()
          if (target.classList.contains('circle-shadow')) {
            target.classList.remove('circle-shadow')
          }
          if (!this.props.modalOpen) {
            this.props.setModalStatus(`form-satelite-${assignment.id}`)
          }
        },
        false
      )
    })
  }

  setOrbitDrop() {
    //Droppable area
    const target = document.getElementById(`circle-${this.props.orbit}`)

    //Entering into the droppable area
    target.addEventListener(
      'dragenter',
      () => {
        if (!target.classList.contains('circle-shadow')) {
          target.classList.add('circle-shadow')
        }
      },
      false
    )

    //Leaving from the droppable area
    target.addEventListener(
      'dragleave',
      () => {
        if (target.classList.contains('circle-shadow')) {
          target.classList.remove('circle-shadow')
        }
      },
      false
    )

    //Over the droppable area
    target.addEventListener(
      'dragover',
      e => {
        e.preventDefault()
      },
      false
    )

    //Drop
    target.addEventListener(
      'drop',
      e => {
        e.preventDefault()
        if (target.classList.contains('circle-shadow')) {
          target.classList.remove('circle-shadow')
        }
        if (!this.props.modalOpen) {
          this.props.setModalStatus(`form-${this.props.orbit}`)
        }
      },
      false
    )
  }

  onMouseOver(e) {
    const target_planet = e.target.parentNode.parentNode //e.g. div.planet-secundus-small

    if (target_planet.firstChild.classList[0] === 'detail-balloon') {
      target_planet.firstChild.style.display = 'inline-block'
    }
  }
  onMouseOut(e) {
    const target_planet = e.target.parentNode.parentNode

    if (target_planet.firstChild.classList[0] === 'detail-balloon') {
      target_planet.firstChild.style.display = 'none'
    }
  }

  onSelected(e) {
    const target = e.target.parentNode.children[1] //e.target = .planet-img-container -> div.mark-container
    const targetPlanet = e.target.parentNode.parentNode.children[2] //canvas #2-Earth
    const selectedPlanetId = targetPlanet.id.split('-')[0]
    try {
      Number(selectedPlanetId)
      target.style
    } catch (e) {
      return
    }

    if (target.style.display === 'block') {
      target.style.display = 'none'
      this.props.disselectAssignment(selectedPlanetId)
    } else if (target.style.display === '' || target.style.display === 'none') {
      target.style.display = 'block'
      this.props.selectAssignment(selectedPlanetId)
    }
  }

  render() {
    const { revolvingAssignments, orbit } = this.props
    if (!revolvingAssignments)
      return <div id={`circle-${orbit}`} className="common-circle" />

    const pos = ['top', 'right', 'left', 'bottom']

    if (revolvingAssignments[orbit].length === 0) {
      return <div id={`circle-${this.props.orbit}`} className="common-circle" />
    }

    return (
      <div id={`circle-${orbit}`} className="common-circle">
        {revolvingAssignments[orbit].map((assignmentInfo, index) => {
          return (
            <div
              className={`common ${pos[index % 4]} ${
                assignmentInfo.orbit_pos
              }-orbit-motion start-animation`}
              key={assignmentInfo.id}
            >
              <div
                className={`planet-${assignmentInfo.planet_size}-${
                  assignmentInfo.orbit_pos
                }`}
              >
                <PopupBox assignmentInfo={assignmentInfo} />
                <Planet
                  className="planet-img-container"
                  planetType={assignmentInfo.planet_type}
                  onClick={this.onSelected.bind(this)}
                  onMouseOver={this.onMouseOver.bind(this)}
                  onMouseOut={this.onMouseOut.bind(this)}
                />
                <canvas
                  id={`${assignmentInfo.id}-${assignmentInfo.planet_type}`}
                  className="canvas"
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(
  ({ revolvingAssignments, selectedStar, modalOpen }) => ({
    revolvingAssignments,
    selectedStar,
    modalOpen,
  }),
  {
    selectAssignment,
    disselectAssignment,
    setSelectedStar,
    resetSelectedStar,
    setModalStatus,
  }
)(CircleOrbit)
