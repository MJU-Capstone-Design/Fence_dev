import React, { Component } from 'react';
import './menu.sass';

class Menu extends Component {

  render(){
    return (
      <nav id="menuWithButton">
        <ul>
          <li> <img src="./menuImg/resized/menu.png" alt="menu" />
            <ul class="drop-menu menu1">
              <li>
                <button onClick={this.props.menuClick.bind(this, 0)}>
                  <img src="./menuImg/resized/bellPin.png" alt="안전비상벨" />
                </button>
              </li>
              <li>
                <button onClick={this.props.menuClick.bind(this, 1)}>
                  <img src="./menuImg/resized/policeStationPin.png" alt="치안시설" />
                </button>
              </li>
              <li>
                <button onClick={this.props.menuClick.bind(this, 2)}>
                  <img src="./menuImg/resized/lightPin.png" alt="보안등" />
                </button>
              </li>
              <li>
                <button onClick={this.props.menuClick.bind(this, 3)}>
                  <img src="./menuImg/resized/cctvPin_.png" alt="cctv" />
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

    );
  }
}

export default Menu;
