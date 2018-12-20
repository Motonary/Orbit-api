import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

// import Planet from './planet'

import { fetchDestroyedAssignments } from '../../actions/assignments'
import { PlanetImgs } from '../../constants/images'

interface StoredPlanetListProps {
  destroyedAssignments: any
  fetchDestroyedAssignments: any
}

class StoredPlanetList extends React.Component<StoredPlanetListProps, {}> {
  componentDidMount() {
    this.props.fetchDestroyedAssignments()
  }

  renderList() {
    const contentList: any = []
    const { destroyedAssignments } = this.props

    function renderPlanetDays(dayDestroyedAssignments: any) {
      _.forEach(dayDestroyedAssignments, (assignment: any) => {
        contentList.push(
          <div className="stored-planet planet-list-row">
            <img src={PlanetImgs[assignment.planet_type]} />
          </div>
          // <Planet
          //   key={assignment.id}
          //   className="stored-planet planet-list-row"
          //   imgClassName=""
          //   planetType={assignment.planet_type}
          // />
        )
      })
    }

    function renderPlanetYears(yearDestroyedAssignments: any) {
      const days: any = Object.keys(yearDestroyedAssignments) //
      days.forEach((day: any) => {
        contentList.push(<div className="day planet-list-row">{day}</div>)
        renderPlanetDays(yearDestroyedAssignments[day])
      })
    }

    function renderStoredPlanetList() {
      if (!destroyedAssignments) return <div>Loading....</div>
      const years: any = Object.keys(destroyedAssignments) //
      years.forEach((year: any) => {
        contentList.push(<div className="year planet-list-row">{year}</div>)
        renderPlanetYears(destroyedAssignments[year])
      })
    }

    renderStoredPlanetList()

    // ゴリ押しアルゴリズム　HACK
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
    const itered = iterator(contentList, 6)
    const result: any = []
    let count: number = 0
    while (itered.hasNext()) {
      if (count % 2 === 0) {
        itered.next().forEach((planet: any) => {
          result.push(planet)
        })
      } else {
        let tmpList = itered.next().reverse()
        tmpList.forEach((planet: any) => {
          result.push(planet)
        })
      }
      count += 1
    }

    return result
  }

  render() {
    const { destroyedAssignments } = this.props
    if (!destroyedAssignments) return <div>Loading....</div>
    return <div id="stored-planet-list">{this.renderList.bind(this)}</div>
  }
}

export default connect(
  ({ destroyedAssignments }: any) => ({ destroyedAssignments }),
  { fetchDestroyedAssignments }
)(StoredPlanetList)
