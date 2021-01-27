import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {useSelector} from 'react-redux'

const SearchMap = () => {

  const[selectedApt,setSelectedApt] = useState(null)


  let mapStyles = {
    width: '35vw',
    height: '80vh'
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

export default SearchMap;
