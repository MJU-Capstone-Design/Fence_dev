import React from "react";

const { InfoWindow } = require("react-google-maps");

class HelloInfo extends React.PureComponent {
  render() {
    console.log("infoData : ",this.props.infoData)
    return (
      <InfoWindow onCloseClick = {this.props.onCloseClick}>
        <p>현재 이 지역의 보안등급은 </p>
      </InfoWindow>
      
    )
  }
}

export default HelloInfo;