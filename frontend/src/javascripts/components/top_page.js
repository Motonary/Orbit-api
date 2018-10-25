import React, { Component } from 'react'
import LoginForm from './guests/login-form'
import ImgLogo from '../../images/index/logo.png'
import ImgPlanet from '../../images/index/top_earth.png'

export default class TopPage extends Component {
  render() {
    return (
      <div className="top-page-container">
        <div className="logo-container">
          <img src={ImgLogo} className="top-page-logo" />
        </div>
        <div className="login-form">
          <LoginForm history={this.props.history}/>
        </div>
        <div className="planet-img-container">
          <img src={ImgPlanet} className="top-page-planet" />
        </div>
      </div>
    )
  }
}
