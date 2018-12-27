import * as React from 'react'
import { Redirect } from 'react-router-dom'
import Alert from 'react-s-alert'
import MypageUserInfo from '../molecules/mypage-user-info'
import MypageOrbit from '../molecules/mypage-orbit'

import '../../../stylesheets/mypage.scss'

// これを発火すると＜Alert />にFlashが現れる
// showFlash() {
//   Alert.success('Successfully signed in!', {
//     position: 'top-right',
//     effect: 'jelly',
//     timeout: 3000,
//     offset: 80
//   })
// }

const MyPageMain = ({ currentUser, match, history }: any) => {
  if (!currentUser) return <div>Loading....</div>

  // currentUser.id: number, match.param.userId: string
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
