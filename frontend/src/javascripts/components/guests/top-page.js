import React, { Component } from 'react'
import TopPageButton from '../atoms/toppage-btn'
import TopPageForm from '../molecules/forms/toppage-form'
import ImgLogo from '../../../images/index/logo.png'
import ImgPlanet from '../../../images/index/top_earth.png'

export default class TopPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignIn: true,
      isSignUp: false,
    }
  }

  onClickTopPageButton() {
    const { isSignIn, isSignUp } = this.state
    if (isSignIn && !isSignUp) {
      this.setState({
        isSignIn: false,
        isSignUp: true,
      })
    } else if (!isSignIn && isSignUp) {
      this.setState({
        isSignIn: true,
        isSignUp: false,
      })
    }
  }

  render() {
    const { isSignIn, isSignUp } = this.state
    const { history } = this.props
    return (
      <div className="top-page-container">
        <div onClick={this.onClickTopPageButton.bind(this)}>
          <TopPageButton isSignIn={isSignIn} />
        </div>
        <div className="logo-container">
          <img src={ImgLogo} className="top-page-logo" />
        </div>
        <TopPageForm
          isSignIn={isSignIn}
          isSignUp={isSignUp}
          history={history}
        />
        <div className="planet-img-container">
          <img src={ImgPlanet} className="top-page-planet" />
        </div>
      </div>
    )
  }
}
