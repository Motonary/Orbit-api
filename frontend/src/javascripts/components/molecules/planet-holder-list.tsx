import * as React from 'react'
import { PlanetImgs } from '../../constants/images'
import PlanetList from '../molecules/planet-list'

interface Props {
  key: any,
}

export default class PlanetHolderList extends React.Component<Props, {}> {
  render() {
    const planetList = Object.keys(PlanetImgs).map(key => {
      return <PlanetList key={key} planetType={key} />
    })
    return <ul id="planet-list">{planetList}</ul>
  }
}
