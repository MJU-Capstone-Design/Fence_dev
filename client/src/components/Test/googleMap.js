/*global google*/
import React from 'react'
import { apiKey } from './API_KEY.js';
import { Config } from '../../config';
import Menu from "./menu.js";
import MapControler from "./mapControler.js";

const { compose, withState, lifecycle, withProps, withHandlers, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");
const { FaAnchor } = require("react-icons/fa");
const fetch = require("isomorphic-fetch");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
var markerPolice = require('./pinImage/policeStationPin2.png');
var markerLight = require('./pinImage/lightPin2.png');
var markerCCTV = require('./pinImage/cctvPin2.png');
const cctv = '/api/cctvs';
const light = '/api/lights';
const police = '/api/polices';
const bell = '/api/bells';

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const GoogleMapWithPins = compose(
  // withState('markers', 'setMarkers', []),
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 25.03, lng: 121.6 },
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
    onMarkerClick: () => (marker) => {
      marker.isOpen = !marker.isOpen 
      console.log(marker)
    },
    // menuClick: (props) => () => {
    //   console.log("??")
    //   const cctv = '/api/cctvs';
    //   const light = '/api/lights';
    //   const police = '/api/polices';
    //   const bell = '/api/bells';
    //   fetch(cctv)
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log("menue click")
    //       console.log(data)
    //       props.setMarkers(data)
    //     });
    // }
    
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{lat: 37.637559, lng: 126.988260 }}
    options={{maxZoom:18}}
  >
    {console.log("pros : ", props)}  
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      minimumClusterSize={5}
    >
      {props.markers.map((marker, idx) => (
        <Marker
          // onClick={props.onMarkerClick}
          key={idx}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{ url: markerCCTV }}
        />
      ))}
    </MarkerClusterer>
    <MapControler position={google.maps.ControlPosition.RIGHT_TOP}>
      <Menu menuClick={props.menuClick}/>
    </MapControler>
  </GoogleMap>
);

class Map extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }
  componentWillMount() {
    this.setState({ markers: [] })
  }
  componentDidMount() {
    console.log("componentDidMount")
  }
  menuClick = (e) => {
    var menuIcon = [cctv, light, police, bell]
    console.log("menu Click-->" + e)
    fetch(menuIcon[e])
      .then(res => res.json())
      .then(data => {
        console.log("menue click")
        console.log(data)
        this.setState({ markers: data })
      });
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <div id="mapWithMenu">
        <GoogleMapWithPins
          markers={this.state.markers}
          isMarkerShown={this.state.isMarkerShown}
          menuClick={this.menuClick}
          // onMarkerClick={this.handleMarkerClick}
          />
        {/* <Menu /> */}
      </div>
      
    )
  }
}
export default Map
