/*global google*/
import React from 'react'
import { apiKey } from './API_KEY.js';

const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers, withStateHandlers } = require("recompose");
const {
     withScriptjs,
     withGoogleMap,
     GoogleMap,
     Marker
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
// const demoFancyMapStyles = require("./demoFancyMapStyles.json");
const StyledMapWithAnInfoBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
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
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={5}
    defaultCenter={props.center}
    // defaultOptions={{ styles: demoFancyMapStyles }}
  >
    <InfoBox
      defaultPosition={new google.maps.LatLng(props.center.lat, props.center.lng)}
      options={{ closeBoxURL: ``, enableEventPropagation: true }}
    >
      <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
          Hello, Taipei!
        </div>
      </div>
    </InfoBox>
    <Marker
      position={{ lat: 22.6273, lng: 120.3014 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoBox
        onCloseClick={props.onToggleOpen}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            Hello, Kaohsiung!
          </div>
        </div>
      </InfoBox>}
    </Marker>
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
      onClick={props.onToggleOpen}
    >
      <InfoWindow onCloseClick={props.onToggleOpen}>
        <div>
          <FaAnchor />
          {" "}
          Controlled zoom: {props.zoom}
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
);
// const MapWithAMarkerClusterer = compose(
//      withProps({
//        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
//        loadingElement: <div style={{ height: '100%' }} />,
//        containerElement: <div style={{ height: '800px' }} />,
//        mapElement: <div style={{ height: '100%' }} />,
//      }),
//      withHandlers({
//        onMarkerClustererClick: () => (markerClusterer) => {
//          console.log('Clicked a cluster')
//        },
//        onMarkerClick: () => (marker) => {
//          console.log('Go to the marker post page')
//         //  window.location = '/post/oxford';
//        }
//      }),
//      withScriptjs,
//      withGoogleMap
// )(props =>
//   <GoogleMap
//     defaultZoom={13}
//     defaultCenter={{lat: 37.537559, lng: 126.988260 }}
//   >
//     {props.markers.map(marker => (
//       <Marker
//         onClick={props.onMarkerClick}
//         key={marker.id}
//         position={{ lat: marker.lat, lng: marker.lng }}
//         slug={marker.slug}
//       />
//     ))}
//     {/* <MarkerClusterer
//       // onClick={props.onMarkerClustererClick}
//       // averageCenter
//       // enableRetinaIcons
//       // gridSize={60}
//     >
//       {props.markers.map(marker => (
//         <Marker
//           onClick={props.onMarkerClick}
//           key={marker.id}
//           position={{ lat: marker.lat, lng: marker.lng }}
//           slug={marker.slug}
//         />
//       ))}
//     </MarkerClusterer> */}
//   </GoogleMap>
// );

class TestMap extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }
  componentWillMount() {
    this.setState({ markers: [{lat: 37.537559, lng: 126.988260 }] })
  }
  componentDidMount() {
    this.delayedShowMarker()

    // const url = '/api/posts';
    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({ markers: data });
    //   });
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
      <StyledMapWithAnInfoBox
        markers={this.state.markers}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}
export default TestMap
