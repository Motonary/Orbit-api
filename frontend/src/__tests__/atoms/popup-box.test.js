import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import PopupBox from '../../javascripts/components/atoms/popup-box'

const assignmentInfo = {
  title: 'test',
  description: 'test',
  deadline: '2018-12-24T15:00:00',
  planet_type: 1,
  planet_size: 1,
  orbit_pos: 2,
}

describe('<PopupBox />', () => {
  it('renders an popup box', () => {
    const popupBox = shallowToJson(
      shallow(<PopupBox assignmentInfo={assignmentInfo} />)
    )
    expect(popupBox).toMatchSnapshot()
  })
})
