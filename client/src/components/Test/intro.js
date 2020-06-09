import React, { Component } from 'react';
// import { Alert } from "react-native";

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    // componentDidMount() {
    //     this.handleClick()
    //   }

    handleClick = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
          },
          (error) => this.setState({ error: error.message}),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      };

    render(){
        return (
            <div>
                <button onClick={this.handleClick}>Get Location!</button>
                <p>latitude={this.state.latitude}</p> 
                <p>longitude={this.state.longitude}</p> 
                <p>error={this.state.error}</p> 
            </div>
        );
    }
}

  
export default Intro;
