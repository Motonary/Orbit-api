import * as React from 'react'
import TopPageBtn from '../../atoms/buttons/toppage-btn'
import TopPageLogo from '../../atoms/toppage-logo'
import TopPagePlanet from '../../atoms/toppage-planet-img'
import ToppageFormContainer from '../../molecules/toppage-form-container'

interface Props {
  currentUser: any
  pathname: any
  history: any
}

interface State {
  isSignIn: boolean
}

export default class TopPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      isSignIn: true,
    }
  }

  onClickTopPageButton() {
    const { isSignIn } = this.state
    if (isSignIn) {
      this.setState({ isSignIn: false })
    } else if (!isSignIn) {
      this.setState({ isSignIn: true })
    } else {
      throw new Error('Sorry, something went wrong...') // 暫定の例外処理
    }
  }

  render() {
    const { isSignIn } = this.state
    const { history } = this.props

    return (
      <div className="top-page-container">
        <TopPageBtn isSignIn={isSignIn} onClick={this.onClickTopPageButton.bind(this)} />
        <TopPageLogo />
        <ToppageFormContainer isSignIn={isSignIn} history={history} />
        <TopPagePlanet />
      </div>
    )
  }
}
