import React, { Component } from 'react'
import classNames from 'classnames'
import { ImgHolderOpen } from '../../../constants/images'

class PlanetHolderOpener extends Component {
  onClickOpenPlanetHolder() {
    const target_class = document.getElementsByClassName('open-planet-holder')
    const planet_list = document.getElementById('planet-list')
    //const planet_holder = document.getElementById("planet-holder")

    // メニュー表示/非表示
    if (target_class[0].classList.contains('click-rotate')) {
      target_class[0].classList.remove('click-rotate')
      planet_list.classList.remove('is-show')
      planet_list.style.display = 'none'
      //planet_holder.classList.remove('holder-border');
    } else {
      target_class[0].classList.add('click-rotate')
      planet_list.classList.add('is-show')
      planet_list.style.display = ''
      planet_list.style.width = '400px'
      //planet_holder.classList.add('holder-border');
    }

    const target = document.getElementById('form-balloon')
    target.style.display = 'none'
  }

  render() {
    const { currentUser, pathname } = this.props
    // 一箇所でしか使ってないけど他のコンポーネントと記法統一して見やすく
    const rootPath = `/users/${currentUser.id}`

    const planetHolderClasses = classNames({
      'open-planet-holder': true,
      'holder-show':
        pathname === `${rootPath}` ||
        /^\/users\/[1-9]\d*\/projects$/.test(pathname),
    })

    return (
      <div
        className={planetHolderClasses}
        onClick={this.onClickOpenPlanetHolder.bind(this)}
      >
        <img src={ImgHolderOpen} className="planet-holder-img" />
      </div>
    )
  }
}

export default PlanetHolderOpener
