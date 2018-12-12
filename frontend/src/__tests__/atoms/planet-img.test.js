import React from 'react'
import { shallow } from 'enzyme'

import PlanetImg from '../../javascripts/components/atoms/planet-img'
import { PlanetImgs } from '../../javascripts/constants/images'

describe('<PlanetImg />', () => {
  it('renders an planet image', () => {
    const planetImg = shallow(<PlanetImg src={PlanetImgs.Earth} />)
    expect(planetImg.find('img').prop('src') === PlanetImgs.Earth).toBe(true)
  })
})
