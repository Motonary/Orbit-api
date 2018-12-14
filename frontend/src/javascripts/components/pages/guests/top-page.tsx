import * as React from 'react'
import TopPageBtn from '../../atoms/buttons/toppage-btn'
import TopPageLogo from '../../atoms/toppage-logo'
import TopPagePlanet from '../../atoms/toppage-planet-img'
import TopPageForm from '../../molecules/forms/toppage-form'

interface Props {
  currentUser: any,
  pathname: any,
  history: any
}

interface State {
  isSignIn: boolean,
  isSignUp: boolean
}

export default class TopPage extends React.Component<Props, State> {
  constructor(props: any) {
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
    } else {
      throw new Error('Sorry, something went wrong...') // 暫定の例外処理
    }
  }

  render() {
    const { isSignIn, isSignUp } = this.state
    const { history } = this.props

    return (
      <div className="top-page-container">
        <TopPageBtn
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
