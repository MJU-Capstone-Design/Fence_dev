import React from "react";

const { InfoWindow } = require("react-google-maps");

class HelloInfo extends React.PureComponent {
    
  render() {
    return (
      <InfoWindow onCloseClick = {this.props.onCloseClick}>
        <p>HelloWorld!</p>
      </InfoWindow>
      
    )
  }
}

export default HelloInfo;