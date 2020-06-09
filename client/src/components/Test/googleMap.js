
import React, { PropTypes, Component } from 'react';
import GoogleMapReact from 'google-map-react';
import controllable from 'react-controllables';
const googleAPI = require('./API_KEY.js');
const AnyReactComponent = ({ img_src }) => <div><img src={img_src} className="YOUR-CLASS-NAME" style={{}} /></div>;

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
  
class GoogleMap extends Component {
  static propTypes = {
    center: PropTypes.array, // @controllable
    zoom: PropTypes.number, // @controllable
    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn
  };
  static defaultProps = {
    center: {
      lat: 37.537559, 
      lng: 126.988260
    },
    zoom: 15
  };
  constructor(props){
    super(props);
    this.state = {
        markers: [],
    }
  }
  componentDidMount(){
    // or you can set markers list somewhere else
    // please also set your correct lat & lng
    // you may only use 1 image for all markers, if then, remove the img_src attribute ^^
    this.setState({
      markers:[{lat: 37.537559, lng: 126.988260, img_src: './marker.png'}]
    });
  }
  _onChildClick = (key, childProps) => {
    this.props.onCenterChange([childProps.lat, childProps.lng]);
  }
  markerClicked(marker) {
    console.log("The marker that was clicked is", marker);
    // you may do many things with the "marker" object, please see more on tutorial of the library's author:
   // https://github.com/istarkov/google-map-react/blob/master/API.md#onchildclick-func 
   // Look at their examples and you may have some ideas, you can also have the hover effect on markers, but it's a bit more complicated I think 
  }
  _onClick = ({x, y, lat, lng, event}) => {
    console.log(x, y, lat, lng, event)
    this.props.onCenterChange([lat, lng]);

  }
  
  render() {
    return (
      <GoogleMapReact
        onClick={this._onClick} 
        bootstrapURLKeys = {{key: googleAPI.apiKey}}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={{height: '300px'}}
        onChildClick={this._onChildClick}
      >
        {this.state.markers.map((marker, i) =>{
          return(
            <AnyReactComponent
              key = {i}
              lat={marker.lat}
              lng={marker.lng}
              img_src={marker.img_src}
              onChildClick={this.markerClicked.bind(this, marker)}
            />
          )
        })}      
      </GoogleMapReact>
    );
  }
}
// GoogleMap.defaultProps = {
//      center: {lat: 37.537559, lng: 126.988260},
//      zoom: 11
// };
export default GoogleMap;