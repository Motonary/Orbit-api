import * as React from 'react'

const WelcomeUser = ({ user }: any) => (
  <div className="user-name">
    <span>WELCOME</span>
    <br />
    {user.name}
  </div>
)

export default WelcomeUser
