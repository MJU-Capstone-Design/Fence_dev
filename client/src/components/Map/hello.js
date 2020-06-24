import React from "react";

const { InfoWindow } = require("react-google-maps");

class HelloInfo extends React.PureComponent {
  render() {
    console.log("클릭?")
    return (
      <InfoWindow onCloseClick = {this.props.onCloseClick}>
        <p>opened</p>
      </InfoWindow>
      
    )
  }
}

export default HelloInfo;