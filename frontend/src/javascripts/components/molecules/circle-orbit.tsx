import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PopupBox from '../atoms/popup-box'
import Planet from '../atoms/planet'

import { selectAssignment, disselectAssignment } from '../../actions/assignments'

import { setSelectedStar, resetSelectedStar, setModalStatus } from '../../actions/common'

interface CircleOrbitProps {
  orbit: any

  modalOpen: any
  selectedStar: any
  revolvingAssignments: any
  selectedAssignments: any

  setSelectedStar: any
  resetSelectedStar: any
  setModalStatus: any

  selectAssignment: any
  disselectAssignment: any
}

class CircleOrbit extends React.Component<CircleOrbitProps, {}> {
  componentDidMount() {
    this.setOrbitDrop()
    this.setPlanetDrop()
  }

  setPlanetDrop(): void {
    const { revolvingAssignments, modalOpen, orbit } = this.props
    if (!revolvingAssignments) return
    // Droppable area
    _.forEach(revolvingAssignments[orbit], assignment => {
      const target: any = document.getElementById(
        `planet-${assignment.id}-${assignment.planet_type}`
      )
      target.addEventListener(
        'dragenter',
        () => {
          if (!target.classList.contains('circle-shadow')) {
            target.classList.add('circle-shadow')
          }
        },
        false
      )

      // Entering into the droppable area
      target.addEventListener(
        'dragenter',
        () => {
          if (!target.classList.contains('circle-shadow')) {
            target.classList.add('circle-shadow')
          }
        },
        false
      )

      // Leaving from the droppable area
      target.addEventListener(
        'dragleave',
        () => {
          if (target.classList.contains('circle-shadow')) {
            target.classList.remove('circle-shadow')
          }
        },
        false
      )

      // Drop
      target.addEventListener(
        'drop',
        (e: any) => {
          e.preventDefault()
          if (target.classList.contains('circle-shadow')) {
            target.classList.remove('circle-shadow')
          }
          if (modalOpen !== '') {
            this.props.setModalStatus(`form-satelite-${assignment.id}`)
          }
        },
        false
      )
    })
  }

  setOrbitDrop(): void {
    const { modalOpen, orbit } = this.props
    // Droppable area
    const target = document.getElementById(`circle-${orbit}`)

    // Entering into the droppable area
    target.addEventListener(
      'dragenter',
      () => {
        if (!target.classList.contains('circle-shadow')) {
          target.classList.add('circle-shadow')
        }
      },
      false
    )

    // Leaving from the droppable area
    target.addEventListener(
      'dragleave',
      () => {
        if (target.classList.contains('circle-shadow')) {
          target.classList.remove('circle-shadow')
        }
      },
      false
    )

    // Over the droppable area
    target.addEventListener(
      'dragover',
      (e: any) => {
        e.preventDefault()
      },
      false
    )

    // Drop
    target.addEventListener(
      'drop',
      (e: any) => {
        e.preventDefault()
        if (target.classList.contains('circle-shadow')) {
          target.classList.remove('circle-shadow')
        }
        if (!modalOpen) {
          this.props.setModalStatus(`form-${orbit}`)
        }
      },
      false
    )
  }

  onMouseOver(e: any) {
    const target_planet = e.target.parentNode.parentNode // e.g. div.planet-secundus-small
    if (target_planet.firstChild.classList[0] === 'detail-balloon') {
      target_planet.firstChild.style.display = 'inline-block'
    }
  }
  onMouseOut(e: any) {
    const target_planet: any = e.target.parentNode.parentNode

    if (target_planet.firstChild.classList[0] === 'detail-balloon') {
      target_planet.firstChild.style.display = 'none'
    }
  }

  onSelected(e: any) {
    const target: any = e.target.parentNode.children[1] // e.target = .planet-img-container -> div.mark-container
    const targetPlanet: any = e.target.parentNode.parentNode.children[2] // canvas #2-Earth
    const selectedPlanet: string = targetPlanet.id

    if (target.style.display === 'block') {
      target.style.display = 'none'
      this.props.disselectAssignment(selectedPlanet)
    } else if (target.style.display === '' || target.style.display === 'none') {
      target.style.display = 'block'
      this.props.selectAssignment(selectedPlanet)
    }
  }

  render() {
    const { revolvingAssignments, orbit } = this.props
    if (!revolvingAssignments) {
      return <div id={`circle-${orbit}`} className="common-circle" />
    }

    const pos = ['top', 'right', 'left', 'bottom']

    if (revolvingAssignments[orbit].length === 0) {
      return <div id={`circle-${this.props.orbit}`} className="common-circle" />
    }

    return (
      <div id={`circle-${orbit}`} className="common-circle">
        {revolvingAssignments[orbit].map((assignmentInfo: any, index: any) => {
          return (
            <div
              className={`common ${pos[index % 4]} ${
                assignmentInfo.orbit_pos
              }-orbit-motion start-animation`}
              key={assignmentInfo.id}
            >
              <div
                id={`planet-${assignmentInfo.id}-${assignmentInfo.planet_type}`}
                className={`planet-${assignmentInfo.planet_size}-${
                  assignmentInfo.orbit_pos
                } start-animation`}
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
  ({ revolvingAssignments, selectedAssignments, selectedStar, modalOpen }: any) => ({
    revolvingAssignments,
    selectedAssignments,
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
