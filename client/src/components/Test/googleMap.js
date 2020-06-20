/*global google*/
import React from "react";
import { apiKey } from "./API_KEY.js";
import { Config } from "../../config";
import Search from "../Search/Search";

const {
  compose,
  withProps,
  withHandlers,
  withStateHandlers,
} = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");
const { FaAnchor } = require("react-icons/fa");
const fetch = require("isomorphic-fetch");
const {
  MarkerClusterer,
} = require("react-google-maps/lib/components/addons/MarkerClusterer");
var markerPolice = require("./pinImage/policeStationPin.png");
var markerLight = require("./pinImage/lightPin.png");
var markerCCTV = require("./pinImage/cctvPin2.png");

// iconUrl = ... (if else choose image)
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const StyledMapWithAnInfoBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
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
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap center={props.center} zoom={props.zoom} options={{ maxZoom: 18 }}>
    {console.log("props : ", props)}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      minimumClusterSize={5}
    >
      {props.markers.map((marker, idx) => (
        <Marker
          onClick={props.onMarkerClick}
          key={idx}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{ url: markerCCTV }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

class TestMap extends React.PureComponent {
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
    this.delayedShowMarker();
    console.log("componentDidMount");

    const cctv = "/api/cctvs";
    const light = "/api/lights";
    const police = "/api/polices";
    const bell = "/api/bells";

    fetch(cctv)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ markers: data });
        console.log(data);
        console.log(this.state);
      });
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    const center = this.state.center;
    const zoom = this.state.zoom;

    return (
      <>
        <Search onPlaceSelected={this.onPlaceSelected} />
        <StyledMapWithAnInfoBox
          markers={this.state.markers}
          isMarkerShown={this.state.isMarkerShown}
          // onMarkerClick={this.handleMarkerClick}
          center={center}
          zoom={zoom}
        />
      </>
    );
  }
}
export default TestMap;
