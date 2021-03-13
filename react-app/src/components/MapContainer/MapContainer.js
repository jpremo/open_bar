import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = ({ props }) => {
  const [selectedApt, setSelectedApt] = useState(null);
  const outerDiv = useRef();
  const [mapStyles, setMapStyles] = useState({
    width: String(Math.max(window.innerWidth * 0.5, 530) - 40) + "px",
    height: String(window.innerHeight - 102) + "px",
  });

  let defaultCenter = { lat: 40.7128, lng: -74.006 };

  if (props) {
    defaultCenter = {
      lat: props.latitude,
      lng: props.longitude,
    };
  }

  const resizeWindow = () => {
    // const ww = Math.max(window.innerWidth * 0.5, 530) - 60;
    // const hh = window.innerHeight - 99;
    const ww = 500;
    const hh = 400;
    outerDiv.current.style.width = ww + "px";
    outerDiv.current.style.height = hh + "px";
    setMapStyles({
      width: ww + "px",
      height: hh + "px",
      border: "2px solid black",
      borderRadius: "10px",
      boxSizing: "border-box",
    });
  };

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("resize", resizeWindow);
    }
    watchScroll();
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  });

  useEffect(() => {
    resizeWindow();
  }, []);

  return (
    <div className="map-outer-div" ref={outerDiv}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {props !== null ? (
          <Marker position={{ lat: props.latitude, lng: props.longitude }} />
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
