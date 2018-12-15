import * as React from 'react'
import { TopPageImgs } from '../../../constants/images'

interface TopPageBtnProps {
  isSignIn: boolean
  onClick: () => void
}

const TopPageBtn: React.SFC<TopPageBtnProps> = ({ isSignIn, onClick }) => (
  <a className="toppage-btn" onClick={onClick}>
    {isSignIn ? (
      <img className="toppage-btn-img" src={TopPageImgs['signUp']} />
    ) : (
      <img className="toppage-btn-img" src={TopPageImgs['signIn']} />
    )}
  </a>
)

export default TopPageBtn
