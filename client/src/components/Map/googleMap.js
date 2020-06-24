/*global google*/
import React from "react";
import { apikey } from "./API_KEY.js";
import Search from "../Search/Search";
import Intro from "./intro.js"
import Menu from "./menu.js";
import MapControler from "./mapControler.js";
import Header from "../Header/Header";
import HelloInfo from "./hello.js";

const { kakao } = window;
const { compose, withProps, withHandlers, withStateHandlers } = require("recompose");
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
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyCR1rDuOlia0H31k6leLQaeY_sMoOJoo2A&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  // withStateHandlers(
  //   () => ({
  //     isOpen: false,
  //   }),
  //   {
  //     onToggleOpen: ({ isOpen }) => () => ({
  //       isOpen: !isOpen,
  //     }),
  //   }
  // ),
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
  <GoogleMap
    center={props.center}
    zoom={props.zoom}
    options={{ maxZoom: 18, disableDefaultUI: true, zoomControl: true }}
  >
    {console.log("pros : ", props)}

    <Marker 
        position={props.center} 
        onClick={props.markerClick}>
        {props.isOpen&& <HelloInfo 
            onCloseClick = {props.markerClick}
            onClick = {props.markerClick}
            />}
    </Marker>

    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      minimumClusterSize={5}
    >
      {props.markers.map((marker, idx) => (
        props.isMarkerShown && 
          <Marker
            key={idx}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{ url: ICON }}
            >
          </Marker>
      ))}
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
    avg : {
      cctv: 0,
      light: 0,
      bell: 0,
    },
    isOpen: false,
  };

  onPlaceSelected = ({ lat, lng }) => {
    this.setState({
      mapPosition: { lat: lat, lng: lng },
      center: { lat: lat, lng: lng },
      zoom: 17,
    });
  };

  componentWillMount() {
    this.setState({ markers: [],
    e: 5 });
  }
  componentDidMount() {
    console.log("componentDidMount");
  }

  markerClick = async () => {
    console.log("clicked!");

    // kakao api part
    var latlng = this.state.center
    var result = {
      p: '', p_dis: 0,
      j: '', j_dis: 0,
      phone: '',
      s: ''
    }
    var ps = new kakao.maps.services.Places(); 
    function callbacks_p (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data[0])
        result.p = data[0].place_name
        result.p_dis = data[0].distance
        result.s = result.p.slice(0, -3)
        // this.setState(result.p = data[0].place_name)
        // this.setState(result.p_dis = data[0].distance)
      }
    }
    function callbacks_j (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data[0])
        result.j = data[0].place_name
        result.j_dis = data[0].distance
      }
    }
    function callbacks_phone (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data[0])
        result.phone = data[0].phone
      }
    }

    var options_acc = {
      location: new kakao.maps.LatLng(latlng.lat, latlng.lng),
      sort: kakao.maps.services.SortBy.ACCURACY
    }
    var options_dis = {
      location: new kakao.maps.LatLng(latlng.lat, latlng.lng),
      sort: kakao.maps.services.SortBy.DISTANCE
    }
    ps.keywordSearch('지구대', callbacks_j, options_acc)
    ps.keywordSearch('파출소', callbacks_p, options_acc)
    ps.keywordSearch('주민센터', callbacks_phone, options_dis)

    console.log(result)

    // marker click event 부분
    var location = this.state.center
    var latlng = `${location.lat}, ${location.lng}`
    console.log(latlng)
    console.log(this.props.center)
    fetch(`/api/info/${latlng}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    
    this.setState({ rank: [] })
    setTimeout(() => {
      console.log(result)
      if (result.p_dis < result.j_dis) {
        result.s = result.p.slice(0, -3)
      } else {
        result.s = result.j.slice(0, -3)
      }
      console.log('api/findRank')
      fetch(`api/findRank/${result.s}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("치안등급 데이터 : ", data);
          this.setState({ rank: data });
        });
    }, 3000);
  }

  showIcon = async (e) => {
    // menu icon click part
    this.forceUpdate();
    var menuIcon = [bell, police, light, cctv]
    var icons = [markerBell, markerPolice, markerLight, markerCCTV]
    console.log("menu Click-->" + e)
    ICON = icons[e]
    fetch(menuIcon[e])
    .then((res) => res.json())
    .then((data) => {
      console.log("menue click");
      this.setState({ markers: data, isMarkerShown: true});
    });
  }

  menuClick = async (e) => {
    await this.showIcon(e)
    // var menuIcon = [bell, police, light, cctv]
    // var icons = [markerBell, markerPolice, markerLight, markerCCTV]
    // console.log("menu Click-->" + e)
    // ICON = icons[e]

    // await this.clearOverlays();
    // fetch(menuIcon[e])
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log("menue click");
    //   this.setState({ markers: data, isMarkerShown: true});
    // });
    // this.setState({ markers: [], e: e, isMarkerShown: true }, () => {
    //   console.log('다른 아이콘 클릭');
    //   console.log('state : ', this.state.markers);
    //   fetch(menuIcon[e])
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("menue click");
    //     this.setState({ markers: data });
    //   });
    // })
  };

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    // this.setState({ isMarkerShown: false });
    this.setState({ isMarkerShown: true, markers: [] });
    this.delayedShowMarker();
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
          markers={this.state.markers}
          isMarkerShown={this.state.isMarkerShown}
          markerClick={this.markerClick}
          menuClick={this.menuClick}
          onMarkerClick={this.handleMarkerClick}
          center={center}
          zoom={zoom}
        />
      </>
    );
  }
}
export default Map;
