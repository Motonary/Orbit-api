import * as React from 'react'

import Planet from './planet'

interface FixedStarProps {
  project: any
}

class FixedStar extends React.Component<FixedStarProps, {}> {
  render() {
    const { id, fixed_star_type } = this.props.project

    return (
      <div id="fixed-star">
        <div id={`project-${id}-${fixed_star_type}`}>
          <Planet className="planet-img-container" planetType={fixed_star_type} />
          <canvas id={`${id}-${fixed_star_type}`} className="project-canvas" />
        </div>
      </div>
    )
  }
}

export default FixedStar
