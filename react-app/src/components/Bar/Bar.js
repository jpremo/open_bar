import './Bar.css'
import BarJSON from "./BarJSON/BarJSON"
import Favorite from "../Favorite/Favorite"
import MapContainer from "../MapContainer/MapContainer"
import Photos from "./Photos/Photos"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Reservation from "../Reservation/Reservation"
import Reviews from "./Reviews/Reviews"
import sushi from './sushi-bar.jpeg' // to be deleted
import { useParams } from 'react-router-dom'
import { barDataDisplay } from '../../store/bars'

function Bar () { // update all values with redux

  const dispatch = useDispatch()
  const { barId }  = useParams();

  let bar = useSelector(state => state.bars['1']);
  console.log(bar)
  if (typeof bar !== 'undefined') {
    console.log(bar.bar.name)
  }
  
  useEffect( () => {
    (async () => {
      await dispatch(barDataDisplay(barId))
    })();
  }, [dispatch])

  return (
    <div>
      <div id='backgroundImg'>
        <img id='backgroundImgProper' src={sushi} alt=''/>
      </div>
      <div id='columnsDiv'>
        <div id='leftColumn'>
          <div className='BorderBottom BorderTop'>
            <h1 id='BarName'>{}</h1>
          </div>
          <span id='summary-span'>
            <span id ='summary-span-1'>Average Review Score {bar.reviews_summary_data.overall}</span>
            <span id ='summary-span-2'>Number of Reviews {bar.reviews_summary_data.review_total}</span>
          </span>
          <div>
            <Photos />
          </div>
          <div>
            <h3 className='BorderBottom'>What {bar.reviews_summary_data.review_total} of people are saying</h3>
            <div className='BorderBottom bottom-padding'>
              <span className='BorderRight'>Overall {bar.reviews_summary_data.overall}</span>
              <span className='BorderRight'>Food {bar.reviews_summary_data.food}</span>
              <span className='BorderRight'>Service {bar.reviews_summary_data.service}</span>
              <span className='BorderRight'>Ambience {bar.reviews_summary_data.ambience}</span>
              <span>Value {bar.reviews_summary_data.value}</span>
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