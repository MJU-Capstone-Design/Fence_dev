import React, { Component } from 'react';
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import './menu.sass';

class Menu extends Component {

    render(){
        return (
            <nav>
                <ul>
                <li> style 1
                    <ul class="drop-menu menu1">
                        <li>option6</li>
                        <li>option5</li>
                        <li>option4</li>
                        <li>option3</li>
                        <li>option2</li>
                        <li>option1</li>
                    </ul>
                </li>
                </ul>
            </nav>

        );
    }
}

  
export default Menu;
