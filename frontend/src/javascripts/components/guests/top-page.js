import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginForm from './login-form'
import SignupForm from './signup-form'
import ImgLogo from '../../../images/index/logo.png'
import ImgPlanet from '../../../images/index/top_earth.png'

export default class TopPage extends Component {
  render() {
    const { url } = this.props.match

    return (
      <div className="top-page-container">
        <div className="logo-container">
          <img src={ImgLogo} className="top-page-logo" />
        </div>
        <div className="login-form">
        {/*<h1 className="text-danger">Hi!</h1>*/}
          <Switch>
            <Route path={`${url}/login`} component={LoginForm} />
            <Route path={`${url}/signup`} component={SignupForm} />
          </Switch>
        </div>
        <div className="planet-img-container">
          <img src={ImgPlanet} className="top-page-planet" />
        </div>
      </div>
    )
  }
}
