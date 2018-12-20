import * as React from 'react'
import { connect } from 'react-redux'

import SignInForm from './forms/signin-form'
import SignUpForm from './forms/signup-form'

interface TopPageFormProps {
  isSignIn: boolean
  history: any
}

class TopPageForm extends React.Component<TopPageFormProps> {
  render() {
    const { isSignIn }: any = this.props
    return (
      <div className="sign-form">
        {isSignIn ? <SignInForm history={history} /> : <SignUpForm history={history} />}
      </div>
    )
  }
}

export default TopPageForm
