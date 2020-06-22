/*global google*/
import React from "react";
import { apikey } from "./API_KEY.js";
import { Config } from "../../config";
import Search from "../Search/Search";
import Intro from "./intro.js";
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
var markerPolice = require('./pinImage/policeStationPin.png');
var markerLight = require('./pinImage/lightPin.png');
var markerCCTV = require('./pinImage/cctvPin.png');
var markerBell = require('./pinImage/bellPin.png');
var ICON
const cctv = '/api/cctvs';
const light = '/api/lights';
const police = '/api/polices';
const bell = '/api/bells';

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const GoogleMapWithPins = compose(
  // withState('markers', 'setMarkers', []),
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyCR1rDuOlia0H31k6leLQaeY_sMoOJoo2A&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
    }
  ),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    },
    onMarkerClick: () => (marker) => {
      marker.isOpen = !marker.isOpen;
      console.log(marker);
    }
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap 
    center={props.center} 
    zoom={props.zoom} 
    options={{ maxZoom: 18 }}>
{/* )(props =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{lat: 37.637559, lng: 126.988260 }}
    options={{maxZoom:20}}
  > */}
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
          icon={{ url: ICON }}
        />
      ))}
    </MarkerClusterer>
    <MapControler position={google.maps.ControlPosition.RIGHT_TOP}>
      <Menu 
        menuClick={props.menuClick}/>
    </MapControler>
  </GoogleMap>
));

class Map extends React.PureComponent {
  state = {
    isMarkerShown: false,
    mapPosition: {
      lat: 37.553505,
      lng: 126.98826,
    },
    center: {
      lat: 37.553505,
      lng: 126.98826,
    },
    zoom: 12,
  };

  onPlaceSelected = ({ lat, lng }) => {
    const { mapPosition, center } = this.state;

    this.setState({
      mapPosition: { lat: lat, lng: lng },
      center: { lat: lat, lng: lng },
      zoom: 17,
    });
  };

  componentWillMount() {
    this.setState({ markers: [] });
  }
  componentDidMount() {
    console.log("componentDidMount")
  }
  menuClick = (e) => {
    this.handleMarkerClick()
    // this.setState({ markers: [] })

    var menuIcon = [bell, police, light, cctv]
    var icons = [markerBell, markerPolice, markerLight, markerCCTV]
    console.log("menu Click-->" + e)
    ICON = icons[e]
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
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    // this.setState({ isMarkerShown: false });
    this.setState({ isMarkerShown: false,
                    markers: [] });

    this.delayedShowMarker();
  };

  render() {
    const center = this.state.center;
    const zoom = this.state.zoom;

    return (
      <>
        <Intro onPlaceSelected={this.onPlaceSelected} />
        <Search onPlaceSelected={this.onPlaceSelected} />
        <GoogleMapWithPins
          markers={this.state.markers}
          isMarkerShown={this.state.isMarkerShown}
          menuClick={this.menuClick}
          // onMarkerClick={this.handleMarkerClick}
          center={center}
          zoom={zoom}
          />
      </>
      
    )
  }
}
export default Map
