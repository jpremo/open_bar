import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {useSelector} from 'react-redux'

const SearchMap = ({center, bars}) => {

  const[selectedApt,setSelectedApt] = useState(null)


  let mapStyles = {
    width: '35vw',
    height: '70vh',
    // border-radius: '25px'
  };
  let defaultCenter = {lat: 40.7128, lng: -74.0060}

  if(center) {
    defaultCenter = {
        lat: center.latitude, lng: center.longitude
    }
  }

  const generateMarkers = () => {

  }
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyBB_qz7gdLnQ9rBYBbQafFjWqx7gyIIJVI'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={defaultCenter}>
            {bars.map((bar, ind) => {
                return (
                    <Marker position={{lat: bar.latitude, lng: bar.longitude}} key={ind} label={`${ind+1}`} />
                )
            })}
       </GoogleMap>
     </LoadScript>
  )
}

export default SearchMap;
