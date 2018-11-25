import React from 'react'
import { TopPageImgs } from '../../constants/images'

const TopPageButton = isSignIn => {
  return (
    <a className="toppage-btn">
      {isSignIn ? (
        <img className="toppage-btn-img" src={TopPageImgs['signUp']} />
      ) : (
        <img className="toppage-btn-img" src={TopPageImgs['signIn']} />
      )}
    </a>
  )
}

export default TopPageButton
