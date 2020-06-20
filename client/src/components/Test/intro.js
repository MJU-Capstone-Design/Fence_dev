import React from "react";

function Intro({ onPlaceSelected }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            onPlaceSelected({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            console.log(position);
          },
          () => null
        );
      }}
    >
      <img src="https://img.icons8.com/doodle/48/000000/compass--v1.png" />
    </button>
  );
}

export default Intro;
