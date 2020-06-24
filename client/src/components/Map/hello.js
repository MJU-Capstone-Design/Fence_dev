import React from "react";
import { Pagination } from "react-bootstrap";

const { InfoWindow } = require("react-google-maps");

class HelloInfo extends React.PureComponent {
  render() {
    return (
      <InfoWindow onCloseClick = {this.props.menuClick}>
        <p>opened</p>
      </InfoWindow>
      
    )
  }
}

export default HelloInfo;