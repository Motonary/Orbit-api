import * as React from 'react'
import UserImg from '../atoms/user-img'
import WelcomeUser from '../atoms/welcome-user'

// なんかもう少しいいコンポーネント名ないかな
// currentUserの実態がわかるdefault定義をしたい
const MypageUserInfo: React.SFC<any> = ({ currentUser = null }: any) => (
  <div className="user-info">
    <UserImg user={currentUser} />
    <WelcomeUser user={currentUser} />
  </div>
)

export default MypageUserInfo
