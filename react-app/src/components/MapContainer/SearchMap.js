import React, {useState, useRef, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {useSelector} from 'react-redux'

const SearchMap = ({center, bars}) => {

  const[selectedApt,setSelectedApt] = useState(null)
  const outerDiv = useRef();

  let mapStyles = {
    width: String(Math.max(window.innerWidth*.5, 530)-40)+'px',
    height: String(window.innerHeight - 102)+'px',
  };
  let defaultCenter = {lat: 40.7128, lng: -74.0060}

  if(center) {
    defaultCenter = {
        lat: center.latitude, lng: center.longitude
    }
  }

  const [scrollX, setScrollX] = useState(0);

  function logit() {
    const ww = Math.max(window.innerWidth * .5, 530) - 40;
    let x = -window.pageXOffset+ww;
    outerDiv.current.style.left = x + "px";
    outerDiv.current.style.position = 'fixed'
  }

  const resizeWindow = () => {
    const ww = Math.max(window.innerWidth * .5, 530) - 40;
    const hh = window.innerHeight - 102
    outerDiv.current.style.width = ww + 'px'
    outerDiv.current.style.height = hh + 'px';
    mapStyles = {
      width: ww + 'px',
      height: hh + 'px',
    };
    logit()
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
      window.addEventListener("resize", resizeWindow);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
      window.removeEventListener("resize", resizeWindow);
    };
  });

  useEffect(() => {
    resizeWindow()
    logit()
  }, [])

  return (
    <div className='map-outer-div' ref={outerDiv}>
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
    </div>
  )
}

export default SearchMap;
