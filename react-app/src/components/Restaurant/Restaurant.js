import React from "react"
import Reviews from "./Reviews/Reviews"
import Photos from "./Photos/Photos"
import Favorite from "../Favorite/Favorite"
import RestaurantJSON from "./RestaurantJSON/RestaurantJSON"
import './Restaurant.css'
import sushi from './sushi-restaurant.jpeg' // to be deleted

function Restaurant () { // update all values with redux
  return (
    <div>
      <div id='backgroundImg'>
        <img id='backgroundImgProper' src={sushi} alt=''/>
      </div>
      <div id='columnsDiv'>
        <div id='leftColumn'>
          <div>
            <h1>Sushi Restaurant name</h1>
            <ul>
              <li>Review Average Score Placeholder</li>
              <li>Number of Ratings Placeholder</li>
            </ul>
          </div>
          <div>
            <Photos />
          </div>
          <div>
            <h6>What placeholder-number of people are saying</h6>
            <ul>
              <li>Food</li>
              <li>Service</li>
              <li>Ambience</li>
              <li>Value</li>
            </ul>
          </div>
          <div>
            <h2>Placeholder for Reviews component</h2>
            <Reviews />
          </div>
        </div>
        <div id='rightColumn'>
          <h1>Other Side</h1>
          <h2>Placeholder for reservations component</h2>
          <h2>Placeholder for maps component</h2>
          <h2>Placeholder for json data component</h2>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;