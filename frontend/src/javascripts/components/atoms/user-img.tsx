import * as React from 'react'

const UserImg = ({ user }: any) => (
  <div className="user-img-container">
    {/* TODO: Production環境ではURL変える */}
    <img src={`http://localhost:3000${user.avatar.url}`} className="user-img" />
  </div>
)

export default UserImg
