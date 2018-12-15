import * as React from 'react'
import { Redirect } from 'react-router-dom'
import MypageUserInfo from '../molecules/mypage-user-info'
import MypageOrbit from '../molecules/mypage-orbit'

const MyPageMain = ({ currentUser, match, history }: any) => {
  if (!currentUser) return <div>Loading....</div>

  if (currentUser.id !== match.params.userId) {
    return <Redirect to={`/users/${currentUser.id}`} />
  }

  return (
    <div id="mypage-container">
      <MypageUserInfo currentUser={currentUser} />
      <MypageOrbit history={history} match={match} />
    </div>
  )
}

export default MyPageMain
