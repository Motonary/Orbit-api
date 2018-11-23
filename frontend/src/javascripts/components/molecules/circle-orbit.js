import * as React from from 'react'
import { connect } from 'react-redux'
import { selectAssignment, disselectAssignment } from '../../actions/assignments'
import Planet from './planet'

class CircleOrbit extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className={`circle-${this.props.orbit} common-circle`} >
        <Planet orbit={this.props.orbit} />
      </div>
    )
  }
}

export default connect(({selectedAssignments}) => ({selectedAssignments}),
  {selectAssignment, disselectAssignment}
)(CircleOrbit)
