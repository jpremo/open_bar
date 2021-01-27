import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {useSelector} from 'react-redux'

const SearchMap = ({center, bars}) => {

  const[selectedApt,setSelectedApt] = useState(null)


  let mapStyles = {
    width: '35vw',
    height: '80vh'
  };
  let defaultCenter = {lat: 40.7128, lng: -74.0060}

  if(center) {
    defaultCenter = {
        lat: center.latitude, lng: center.longitude
    }
  }

  const generateMarkers = () => {

  }
  const urlBase='https://maps.google.com/mapfiles/kml/shapes/'
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyBB_qz7gdLnQ9rBYBbQafFjWqx7gyIIJVI'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}>
            )}
            {<Marker position={defaultCenter}/>}
            {/* icon={urlBase + 'parking_lot_maps.png'} */}
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
