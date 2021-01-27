import React from "react"
import Reviews from "./Reviews/Reviews"
import Photos from "./Photos/Photos"
import Favorite from "../Favorite/Favorite"
// import MapContainer from "../MapContainer/MapContainer"
import RestaurantJSON from "./RestaurantJSON/RestaurantJSON"
import './Restaurant.css'
import sushi from './sushi-restaurant.jpeg' // to be deleted
import { useParams } from 'react-router-dom'

function Restaurant () { // update all values with redux
  const { restaurantId }  = useParams();

  return (
    <div>
      <div id='backgroundImg'>
        <img id='backgroundImgProper' src={sushi} alt=''/>
      </div>
      <div id='columnsDiv'>
        <div id='leftColumn'>
          <div className='BorderBottom BorderTop'>
            <h1 id='RestaurantName'>Sushi Restaurant name {restaurantId}</h1>
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
          <h2>Placeholder for reservations component</h2>
          <div id="google-map-container">
            <h2>Map will go here</h2>
            {/* <MapContainer/> */}
          </div>
          <RestaurantJSON />
        </div>
      </div>
    </div>
  );
}

export default Restaurant;