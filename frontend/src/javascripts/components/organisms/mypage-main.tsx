import * as React from 'react'
import { Redirect } from 'react-router-dom'
import Alert from 'react-s-alert'
import MypageUserInfo from '../molecules/mypage-user-info'
import MypageOrbit from '../molecules/mypage-orbit'

import '../../../stylesheets/mypage.scss'

interface MyPageMainProps {
  currentUser: any
  match: any
  history: any
}

const MyPageMain: React.SFC<MyPageMainProps> = ({ currentUser, match, history }) => {
  if (!currentUser) return <div>Loading....</div>

  if (currentUser.id !== parseInt(match.params.userId, 10)) {
    return <Redirect to={`/users/${currentUser.id}`} />
  }

  return (
    <div id="mypage-container">
      <MypageUserInfo currentUser={currentUser} />
      <MypageOrbit history={history} match={match} />
      <Alert />
    </div>
  )
}

export default MyPageMain
