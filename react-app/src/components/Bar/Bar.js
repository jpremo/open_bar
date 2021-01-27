import './Bar.css'
import BarJSON from "./BarJSON/BarJSON"
import Favorite from "../Favorite/Favorite"
import MapContainer from "../MapContainer/MapContainer"
import Photos from "./Photos/Photos"
import React, { useEffect, useState } from "react"
import Reservation from "../Reservation/Reservation"
import Reviews from "./Reviews/Reviews"
import sushi from './sushi-bar.jpeg' // to be deleted
import { useParams } from 'react-router-dom'

function Bar () { // update all values with redux
  const { barId }  = useParams();

  const [barData, setBarData] = useState({});

  let data = {}

  useEffect( () => {
    async function getBarData(barId) {
      const barRawData = await fetch(`http://localhost:5000/api/bars/${barId}`);
      const barJSONData = await barRawData.json();
      setBarData(barJSONData);
      data = barJSONData;
      console.log(barJSONData, barData, data)
    }
    getBarData(barId);
  }, [])

  return (
    <div>
      <div id='backgroundImg'>
        <img id='backgroundImgProper' src={sushi} alt=''/>
      </div>
      <div id='columnsDiv'>
        <div id='leftColumn'>
          <div className='BorderBottom BorderTop'>
            <h1 id='BarName'>Sushi Bar name {barId}</h1>
          </div>
          <span id='summary-span'>
            <span id ='summary-span-1'>Review Average Score Placeholder</span>
            <span id ='summary-span-2'>Number of Ratings Placeholder</span>
          </span>
          <div>
            <Photos />
          </div>
          <div>
            <h3 className='BorderBottom'>What placeholder-number of people are saying</h3>
            <div className='BorderBottom bottom-padding'>
              <span className='BorderRight'>Overall</span>
              <span className='BorderRight'>Food</span>
              <span className='BorderRight'>Service</span>
              <span className='BorderRight'>Ambience</span>
              <span>Value</span>
            </div>
          </div>
          <div>
            <Reviews />
          </div>
        </div>
        <div id='rightColumn'>
          <div>
            <Reservation />
          </div>
          <div>
            <Favorite />
          </div>
          <div id="google-map-container">
            <MapContainer/>
          </div>
          <BarJSON />
        </div>
      </div>
    </div>
  );
}

export default Bar;