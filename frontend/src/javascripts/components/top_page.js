import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './login_form';
import ImgLogo from '../../images/index/logo.png';
import ImgPlanet from '../../images/index/top_earth.png';

class TopPage extends Component {
  render() {
    return (
      <div className="top-page-container">
        <div className="img-container">
          <img src={ImgLogo} className="top-page-logo" />
        </div>
        <div>
          <LoginForm />
        </div
        <div className="img-container">
          <img src={ImgPlanet} className="top-page-planet" />
        </div>
      </div>
    );
  }
}
