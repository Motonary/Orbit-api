import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import Planet from './planet'
import PopupBox from '../atoms/popup-box'

interface StoredPlanetListProps {
  selectedAssignments: any

  destroyedAssignments: any
}

class StoredPlanetList extends React.Component<StoredPlanetListProps, {}> {
  renderList() {
    const contentList: any = []
    const { destroyedAssignments } = this.props

    function renderPlanetDays(dayDestroyedAssignments: any) {
      _.forEach(dayDestroyedAssignments, (assignment: any) => {
        contentList.push(
          <div
            key={assignment.id}
            id={`planet-${assignment.id}-${assignment.planet_type}`}
            className="stored-planet-container"
          >
            <PopupBox data={assignment} isProject={false} />
            <Planet className="stored-planet" planetType={assignment.planet_type} />
          </div>
        )
      })
    }

    function renderPlanetYears(yearDestroyedAssignments: any) {
      const days: any = Object.keys(yearDestroyedAssignments) //
      days.forEach((day: any) => {
        contentList.push(
          <div className="date">
            <div className="day">{day}</div>
          </div>
        )
        renderPlanetDays(yearDestroyedAssignments[day])
      })
    }

    function renderStoredPlanetList() {
      if (!destroyedAssignments) return
      const years: any = Object.keys(destroyedAssignments) //
      years.forEach((year: any) => {
        contentList.push(
          <div className="date">
            <div className="year planet-list-row">{year}</div>
          </div>
        )
        renderPlanetYears(destroyedAssignments[year])
      })
    }

    // ゴリ押しアルゴリズム
    function iterator(collection: any, howMany: number) {
      let count = 0
      function next() {
        let index = howMany * count
        let result = collection.slice(index, index + howMany)
        count += 1
        return result
      }
      function hasNext() {
        let index = howMany * count
        return collection.slice(index, index + howMany).length > 0
      }
      return { next: next, hasNext: hasNext }
    }

    renderStoredPlanetList()

    const itered = iterator(contentList, 6)
    const result: any = []
    let count: number = 0
    while (itered.hasNext()) {
      if (count % 2 === 0) {
        itered.next().forEach((assignment: any) => {
          result.push(assignment)
        })
      } else {
        let tmpList = itered.next().reverse()
        tmpList.forEach((assignment: any) => {
          result.push(assignment)
        })
      }
      count += 1
    }

    return result
  }

  render() {
    const { destroyedAssignments } = this.props
    if (!destroyedAssignments) return <div>Loading....</div>
    if (Object.keys(destroyedAssignments).length === 0) return <div />
    const contentList = this.renderList()

    return (
      <div id="stored-planet-list">
        {_.forEach(contentList, (content: any) => {
          return content
        })}
      </div>
    )
  }
}

export default connect(
  ({ selectedAssignments, destroyedAssignments }: any) => ({
    selectedAssignments,
    destroyedAssignments,
  }),
  {}
)(StoredPlanetList)
