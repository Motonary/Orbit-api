import React from 'react'

const WelcomeUser = ({ user }) => (
  <div className="user-name">
    <span>WELCOME</span>
    <br />
    {user.name}
  </div>
)

export default WelcomeUser
