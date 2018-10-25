import React, { Component } from 'react'
import ImgHolderOpen from '../../../images/main/planet_holder_btn.png'

class Footer extends Component {
  render() {
    return(
      <div id="footer">
        <div id="planet-holder">
          <div className="open-planet circle-border">
            <img src={ImgHolderOpen} />
          </div>
          <ul id="planet-list">
            <li id="earth" className="planet" draggable="true">地球</li>
            <li className="planet" draggable="true">YO</li>
            <li className="planet" draggable="true">OH</li>
            <li className="planet" draggable="true">OH</li>
            <li className="planet" draggable="true">OH</li>
            <li className="planet" draggable="true">OH</li>
            <li className="planet" draggable="true">OH</li>
          </ul>
        </div>
        <div id="disapperance-holder">
          <ul id="disapperance-list">
            <li className="disapperance" id="pause">HI</li>
            <li className="disapperance" id="restart">HI</li>
            <li className="disapperance">HI</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer
