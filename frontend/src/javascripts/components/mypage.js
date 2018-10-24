import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Mypage extends Component {
  render() {
    const { currentUser } = this.props
    if (!currentUser) {
      return <div>Loading....</div>
    }

    if (currentUser.id != this.props.match.params.userId) {
      const correctPath = `/users/${currentUser.id}`
      return <Redirect to={correctPath} />
    }

    return(
      <div>
        <div id="system">
          <div id="fixed-star"></div>
          <div className="circle1 common-circle">
            <div className="common bottom first-orbit-motion">
              <div className="planet-large-1 bg-color"></div>
            </div>
            <div className="common top first-orbit-motion">
              <div className="planet-large-1 bg-color"></div>
            </div>
          </div>
          <div className="circle2 common-circle">
            <div className="common top second-orbit-motion">
              <div className="planet-medium-2 bg-color"></div>
              <div className="satelite-orbit">
                <div className="common top satelite-orbit-motion">
                  <div className="satelite bg-color"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="circle3 common-circle">
            <div className="common right third-orbit-motion">
              <div className="planet-small-3 bg-color"></div>
              <div className="satelite-orbit">
                <div className="common top satelite-orbit-motion">
                  <div className="satelite bg-color"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser })
)(Mypage)
