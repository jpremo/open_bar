import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {useSelector} from 'react-redux'

const MapContainer = () => {

  const[selectedApt,setSelectedApt] = useState(null)


  let mapStyles = {
    width: '400px',
    height: '400px'
};

  const defaultCenter = {
    lat: 40.7128, lng: -74.0060
  }

  return (
     <LoadScript
       googleMapsApiKey='AIzaSyBB_qz7gdLnQ9rBYBbQafFjWqx7gyIIJVI'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}>
            )}
            {/* {<Marker position={defaultCenter}/>} */}

       </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;
