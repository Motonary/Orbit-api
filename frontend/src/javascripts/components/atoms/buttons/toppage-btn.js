import React from 'react'
import { TopPageImgs } from '../../../constants/images'

const TopPageBtn = ({ isSignIn, onClick }) => (
  <div className="toppage-btn" onClick={onClick}>
    {isSignIn ? (
      <img className="toppage-btn-img" src={TopPageImgs['signUp']} />
    ) : (
      <img className="toppage-btn-img" src={TopPageImgs['signIn']} />
    )}
  </div>
)

export default TopPageBtn
