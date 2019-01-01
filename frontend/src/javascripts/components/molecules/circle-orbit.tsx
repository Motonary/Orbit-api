import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PopupBox from '../atoms/popup-box'
import Planet from './planet'

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
}

class CircleOrbit extends React.Component<CircleOrbitProps, {}> {
  componentDidMount() {
    this.setOrbitDrop()
    this.setPlanetDrop()
  }

  componentDidUpdate() {
    this.addWarningAnimation()
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

  addWarningAnimation() {
    const { revolvingAssignments, orbit } = this.props
    if (!revolvingAssignments) return

    const today: any = new Date().getTime()
    const msPerDay = 24 * 60 * 60 * 1000
    _.forEach(revolvingAssignments[orbit], (assignment: any) => {
      if (!assignment || !assignment.deadline) return
      const deadline: any = new Date(
        assignment.deadline.replace(/-/g, '/').replace(/T/g, ' ')
      ).getTime()

      if ((deadline - today) / msPerDay < 3) {
        const targetDom = document.getElementById(
          `planet-${assignment.id}-${assignment.planet_type}`
        )
        targetDom.classList.add('planet-warning-size')
        targetDom.children[1].classList.add('warning-animation')
      }
    })
  }

  render() {
    const { revolvingAssignments, orbit } = this.props
    if (!revolvingAssignments) {
      return <div id={`circle-${orbit}`} className="common-circle" />
    }

    const pos = ['top', 'right', 'left', 'bottom']
    const assignmentsOnEachOrbit = revolvingAssignments[orbit]

    if (assignmentsOnEachOrbit && assignmentsOnEachOrbit.length === 0) {
      return <div id={`circle-${orbit}`} className="common-circle" />
    }

    return (
      <div id={`circle-${orbit}`} className="common-circle">
        {assignmentsOnEachOrbit &&
          assignmentsOnEachOrbit.map((assignmentInfo: any, index: any) => {
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
                  <PopupBox data={assignmentInfo} isProject={false} />
                  <Planet
                    className="planet-img-container"
                    planetType={assignmentInfo.planet_type}
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
    setSelectedStar,
    resetSelectedStar,
    setModalStatus,
  }
)(CircleOrbit)
