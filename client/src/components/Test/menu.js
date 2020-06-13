import React, { Component } from 'react';
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import './menu.sass';
import { GiCctvCamera } from "react-icons/gi";
class Menu extends Component {

  render(){
    return (
      <nav id="menuWithButton">
        <ul>
          <li> <img src="./menuImg/resized/menu.png" />
            <ul class="drop-menu menu1">
              <li>
                <button>
                  <img src="./menuImg/resized/bellPin.png" />
                </button>
              </li>
              <li>
                <button>
                  <img src="./menuImg/resized/policeStationPin.png" />
                </button>
              </li>
              <li>
                <button>
                  <img src="./menuImg/resized/lightPin.png" />
                </button>
              </li>
              <li>
                <button>
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
