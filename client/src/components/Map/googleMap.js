/*global google*/
import React from "react";
import { apikey } from "./API_KEY.js";
import Search from "../Search/Search";
import Intro from "./intro.js";
import Menu from "./menu.js";
import MapControler from "./mapControler.js";
import Header from "../Header/Header";
import HelloInfo from "./hello.js";

const { kakao } = window;
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
var markerCCTV = require("./pinImage/cctvPin.png");
var markerBell = require("./pinImage/bellPin.png");

// var markerPolice = require("./pinImage/cap.png");
// var markerLight = require("./pinImage/street.png");
// var markerCCTV = require("./pinImage/cctv_icon.png");
// var markerBell = require("./pinImage/bell_icon.png");
var ICON;
const cctv = "/api/cctvs";
const light = "/api/lights";
const police = "/api/polices";
const bell = "/api/bells";
const findRank = "/api/findRank";
const latlng = "/api/info/:latlng";

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const GoogleMapWithPins = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apikey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({ isOpen: !isOpen }),
      // onMapClick: ({ isMarkerShown }) => (e) => ({
      //   center: e.latLng,
      //   isMarkerShown: true,
      // }),
    }
  ),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    center={props.center}
    zoom={props.zoom}
    options={{ maxZoom: 18, disableDefaultUI: true, zoomControl: true }}
    onClick={(e) => {
      console.log(e.latLng.lat());
      props.onPlaceSelected({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }}
  >
    {console.log("pros : ", props)}
    {props.isMarkerShown && (
      <Marker
        position={props.center}
        onClick={() => {
          setTimeout(() => {
            props.onToggleOpen();
          }, 1500);
          props.markerClick();
        }}
      >
        {props.isOpen && (
          <HelloInfo
            infoData={props.result}
            onCloseClick={props.onToggleOpen}
          />
        )}
      </Marker>
    )}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      minimumClusterSize={5}
    >
      {props.markers.map(
        (marker, idx) =>
          props.isMarkerShown && (
            <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{ url: ICON }}
            ></Marker>
          )
      )}
    </MarkerClusterer>
    <MapControler position={google.maps.ControlPosition.RIGHT_TOP}>
      <Menu menuClick={props.menuClick} />
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
    avg: {
      cctv: 0,
      light: 0,
      bell: 0,
    },
  };

  onPlaceSelected = ({ lat, lng }) => {
    this.setState({
      mapPosition: { lat: lat, lng: lng },
      center: { lat: lat, lng: lng },
      zoom: 17,
      isMarkerShown: true,
    });
  };

  componentWillMount() {
    this.setState({
      markers: [],
      result: {
        rank: "",
        grid: "",
        search: "",
      },
      isOpen: false,
    });
  }
  componentDidMount() {
    console.log("componentDidMount");
  }

  // clearOverlaysInfo = () => {
  //   this.state.markers = [];
  //   console.log(this.state.markers);
  // };
  markerClick = async () => {
    console.log("clicked!");

    // kakao api part
    var latlng = this.state.center;
    var result = {
      p: "",
      p_dis: 0,
      j: "",
      j_dis: 0,
      phone: "",
      s: "",
    };
    var ps = new kakao.maps.services.Places();
    function callbacks_p(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data[0]);
        result.p = data[0].place_name;
        result.p_dis = data[0].distance;
        result.s = result.p.slice(0, -3);
      }
    }
    function callbacks_j(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data[0]);
        result.j = data[0].place_name;
        result.j_dis = data[0].distance;
      }
    }
    function callbacks_phone(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data[0]);
        result.phone = data[0].phone;
      }
    }

    var options_acc = {
      location: new kakao.maps.LatLng(latlng.lat, latlng.lng),
      sort: kakao.maps.services.SortBy.ACCURACY,
    };
    var options_dis = {
      location: new kakao.maps.LatLng(latlng.lat, latlng.lng),
      sort: kakao.maps.services.SortBy.DISTANCE,
    };
    ps.keywordSearch("지구대", callbacks_j, options_acc);
    ps.keywordSearch("파출소", callbacks_p, options_acc);
    ps.keywordSearch("주민센터", callbacks_phone, options_dis);

    // marker click event 부분
    var location = this.state.center;
    var latlng = `${location.lat}, ${location.lng}`;
    console.log(latlng);
    fetch(`/api/info/${latlng}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        var x = this.state.result;
        x.grid = data;
        this.setState({ result: x });
      });

    setTimeout(() => {
      console.log("result : ", result);
      if (result.p_dis < result.j_dis) {
        result.s = result.p.slice(0, -3);
        var x = this.state.result;
        x.search = result;
        this.setState({ result: x });
      } else {
        result.s = result.j.slice(0, -3);
        var x = this.state.result;
        x.search = result;
        this.setState({ result: x });
      }
      console.log("api/findRank");
      fetch(`api/findRank/${result.s}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("치안등급 데이터 : ", data);
          var x = this.state.result;
          x.rank = data;
          this.setState({ result: x });
        });
    }, 1000);
  };

  showIcon = async (e) => {
    // menu icon click part
    var menuIcon = [bell, police, light, cctv];
    var icons = [markerBell, markerPolice, markerLight, markerCCTV];
    console.log("menu Click-->" + e);
    ICON = icons[e];
    fetch(menuIcon[e])
      .then((res) => res.json())
      .then((data) => {
        console.log("menue click");
        this.setState({ markers: data, isMarkerShown: true });
      });
  };

  clearOverlaysMarkers = () => {
    // this.state.markers.setMap(null);
    this.state.markers = [];
    console.log(this.state.markers);
  };
  menuClick = async (e) => {
    await this.clearOverlaysMarkers();
    await this.showIcon(e);
  };

  render() {
    const center = this.state.center;
    const zoom = this.state.zoom;

    return (
      <>
        <Header />
        <Search onPlaceSelected={this.onPlaceSelected} />
        <Intro onPlaceSelected={this.onPlaceSelected} />
        <GoogleMapWithPins
          result={this.state.result}
          markers={this.state.markers}
          isMarkerShown={this.state.isMarkerShown}
          markerClick={this.markerClick}
          menuClick={this.menuClick}
          onMarkerClick={this.handleMarkerClick}
          center={center}
          zoom={zoom}
          onPlaceSelected={this.onPlaceSelected}
        />
      </>
    );
  }
}
export default Map;
