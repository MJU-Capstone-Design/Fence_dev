import React, { Component } from 'react';
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import './menu.sass';
import { GiCctvCamera } from "react-icons/gi";

const fetch = require("isomorphic-fetch");

class Menu extends Component {

  render(){
    return (
      <nav id="menuWithButton">
        <ul>
          <li> <img src="./menuImg/resized/menu.png" />
            <ul class="drop-menu menu1">
              <li>
                <button onClick={this.props.menuClick.bind(this, 0)}>
                  <img src="./menuImg/resized/bellPin.png" />
                </button>
              </li>
              <li>
                <button onClick={this.props.menuClick.bind(this, 1)}>
                  <img src="./menuImg/resized/policeStationPin.png" />
                </button>
              </li>
              <li>
                <button onClick={this.props.menuClick.bind(this, 2)}>
                  <img src="./menuImg/resized/lightPin.png" />
                </button>
              </li>
              <li>
                <button onClick={this.props.menuClick.bind(this, 3)}>
                  <img src="./menuImg/resized/cctvPin_.png" />
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
