import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const MapContainer = ({ props }) => {

  const[selectedApt, setSelectedApt] = useState(null)


  let mapStyles = {
    width: '30vw',
    height: '30vh',
    // border-radius: '25px'
  };

  let defaultCenter = {
    lat: 40.7128, lng: -74.0060
  }

  if (props !== null) {
    defaultCenter = {
        lat: props.latitude, lng: props.longitude
    }
  }

  return (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}>
          { props !== null ? <Marker position={{lat: props.latitude, lng: props.longitude}} /> : null}
       </GoogleMap>
  )
}

export default MapContainer;
