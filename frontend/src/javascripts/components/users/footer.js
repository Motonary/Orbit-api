import React, { Component } from 'react'
import ImgHolderOpen from '../../../images/main/planet_holder_btn.png'
import { PlanetImgs } from '../../constants'
import { DeleteIcons } from '../../constants'

class Footer extends Component {
  componentDidMount() {
    let planet_list = document.getElementById("planet-list")
    planet_list.style.display = 'none'
  }

  onClickOpenPlanetHolder() {
    const target_class = document.getElementsByClassName("open-planet-holder")
    const planet_list = document.getElementById("planet-list")
    //const planet_holder = document.getElementById("planet-holder")

    // メニュー表示/非表示
    if(target_class[0].classList.contains("click-rotate")) {
       target_class[0].classList.remove("click-rotate")
       planet_list.classList.remove("is-show")
       planet_list.style.display = 'none'
       //planet_holder.classList.remove('holder-border');
    } else {
      target_class[0].classList.add("click-rotate")
      planet_list.classList.add("is-show")
      planet_list.style.display = ''
      planet_list.style.width = '400px'
      //planet_holder.classList.add('holder-border');
    }
  }

  renderPlanetImgList(planetImg) {
    return (
      <li key={planetImg} className="planet" draggable="true"><img src={planetImg} className="planet-img"/></li>
    )
  }

  renderDeleteIconList(deleteIcon) {
    return (
      <li key={deleteIcon} className="disapperance"><img src={deleteIcon} className="delete-btn"/></li>
    )
  }
  // TODO: footer の実際の細かい動き（planetholder＆destroyの設定）
  render() {
    return(
      <div id="footer">
        <div id="planet-holder">
          <div className="open-planet-holder" onClick={this.onClickOpenPlanetHolder.bind(this)}>
            <img src={ImgHolderOpen} className="planet-holder-img"/>
          </div>
          <ul id="planet-list">
            { PlanetImgs.map(this.renderPlanetImgList) }
          </ul>
        </div>
        <div id="disapperance-holder">
          <ul id="disapperance-list">
            { DeleteIcons.map(this.renderDeleteIconList) }
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer
