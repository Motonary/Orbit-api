import React, { Component } from 'react'
import TopPageButton from '../atoms/toppage-btn'
import TopPageLogo from '../atoms/toppage-logo'
import TopPagePlanet from '../atoms/top-page-planet.js'
import TopPageForm from '../molecules/forms/toppage-form'

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
        <TopPageButton
          isSignIn={isSignIn}
          onClick={this.onClickTopPageButton.bind(this)}
        />
        <TopPageLogo />
        <TopPageForm
          isSignIn={isSignIn}
          isSignUp={isSignUp}
          history={history}
        />
        <TopPagePlanet />
      </div>
    )
  }
}
