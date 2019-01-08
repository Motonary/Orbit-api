import * as React from 'react'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'

import CheckMark from '../atoms/check-mark'
import PlanetImg from '../atoms/planet-img'

import { selectAssignment, disselectAssignment } from '../../actions/assignments'
import { selectProject, disselectProject } from '../../actions/projects'

import { PlanetImgs } from '../../constants/images'

interface PlanetProps {
  className: string
  planetType: string

  selectedProject: any
  selectedAssignments: any

  selectAssignment: any
  disselectAssignment: any
  selectProject: any
  disselectProject: any
}

class Planet extends React.Component<PlanetProps, {}> {
  onMouseOver(e: any) {
    const targetPlanet = e.target.parentNode.parentNode.firstChild // e.g. div.detail-ballon
    const firstClass = targetPlanet.classList[0]

    if (firstClass && firstClass.includes('popup')) {
      targetPlanet.style.display = 'block'
    }
  }

  onMouseOut(e: any) {
    const targetPlanet: any = e.target.parentNode.parentNode.firstChild
    const firstClass = targetPlanet.classList[0]

    if (firstClass && firstClass.includes('popup')) {
      targetPlanet.style.display = 'none'
    }
  }

  showErrorFlash(errorMessage: string) {
    Alert.error(errorMessage, {
      position: 'top-right',
      effect: 'jelly',
      timeout: 3000,
      offset: 80,
    })
  }

  onSelected(e: any) {
    // TODO: ifがネストしているなど可読性が低いので要リファクタリング
    // この条件分岐は仕様的にリファクタは厳しいと思います
    const target: any = e.target.parentNode.children[1] // e.target = .planet-img-container -> div.mark-container
    const targetPlanet: any = e.target.parentNode.parentNode // id #planet-2-Earth
    const selectedPlanet: string = targetPlanet.id.split('-') // Array(planet, 2, Earth)

    if (target.style === 'undefined') return

    if (target.style.display === 'block') {
      target.style.display = 'none'
      if (selectedPlanet[0] === 'planet') {
        this.props.disselectAssignment(`${selectedPlanet[1]}-${selectedPlanet[2]}`)
      } else {
        this.props.disselectProject(`${selectedPlanet[1]}-${selectedPlanet[2]}`)
      }
    } else if (target.style.display === '' || target.style.display === 'none') {
      if (selectedPlanet[0] === 'planet') {
        if (this.props.selectedProject.length === 0) {
          target.style.display = 'block'
          this.props.selectAssignment(`${selectedPlanet[1]}-${selectedPlanet[2]}`)
        } else {
          this.showErrorFlash('Unable to select both fixed star and planets at the same time...')
        }
      } else {
        if (this.props.selectedAssignments.length === 0) {
          target.style.display = 'block'
          this.props.selectProject(`${selectedPlanet[1]}-${selectedPlanet[2]}`)
        } else {
          this.showErrorFlash('Unable to select both fixed star and planets at the same time...')
        }
      }
    }
  }

  render() {
    const { className, planetType } = this.props
    return (
      <div
        className={className}
        onClick={this.onSelected.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
      >
        <PlanetImg src={PlanetImgs[planetType]} />
        <CheckMark />
      </div>
    )
  }
}

export default connect(
  ({ selectedProject, selectedAssignments }: any) => ({ selectedProject, selectedAssignments }),
  { selectAssignment, disselectAssignment, selectProject, disselectProject }
)(Planet)
