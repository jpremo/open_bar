import './Bar.css'
import BarJSON from "./BarJSON/BarJSON"
import Favorite from "../Favorite/Favorite"
import MapContainer from "../MapContainer/MapContainer"
import Photos from "./Photos/Photos"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Reservation from "../Reservation/Reservation"
import Reviews from "./Reviews/Reviews"
import { useParams } from 'react-router-dom'
import { barDataDisplay } from '../../store/bars'
import { clear } from '../../store/users'

function Bar () {

  const dispatch = useDispatch()
  const { barId }  = useParams();

  let bar = useSelector(state => state.bars['1']);

  console.log('bar', bar)

  const user = useSelector(state => state.session.user);

  useEffect( () => {
    (async () => {
      await dispatch(clear())
      await dispatch(barDataDisplay(barId))
    })();
  }, [dispatch])

  return (
    <div>
      <div id='backgroundImg'>
        <img id='backgroundImgProper' src={typeof bar !== 'undefined' ? bar.bar.bannerImg : null} alt=''/>
      </div>
      <div id='columnsDiv'>
        <div id='leftColumn'>
          <div className='BorderBottom BorderTop'>
            <h1 id='BarName'>{ typeof bar !== 'undefined' ? bar.bar.name : null }</h1>
          </div>
          <span id='summary-span'>
            <span id ='summary-span-1'>Average Review Score { typeof bar !== 'undefined' ? bar.reviews_summary_data.overall : null}</span>
            <span id ='summary-span-2'>Number of Reviews {typeof bar !== 'undefined' ? bar.reviews_summary_data.review_total : null}</span>
          </span>
          <div id='description-text'>{ typeof bar !== 'undefined' ? bar.bar.description : null}</div>
          <div>
            <Photos props={typeof bar !== 'undefined' ? bar.images : null}/>
          </div>
          <div>
            <h3 className='BorderBottom' id='see-summary'>See Summary of Ratings of {typeof bar !== 'undefined' ? bar.reviews_summary_data.review_total : null} Bar-Goers </h3>
            <div>
              <span className='BorderRight'>Overall {typeof bar !== 'undefined' ? bar.reviews_summary_data.overall : null}</span>
              <span className='BorderRight'>Food {typeof bar !== 'undefined' ? bar.reviews_summary_data.food : null}</span>
              <span className='BorderRight'>Service {typeof bar !== 'undefined' ? bar.reviews_summary_data.service : null}</span>
              <span className='BorderRight'>Ambience {typeof bar !== 'undefined' ? bar.reviews_summary_data.ambience : null}</span>
              <span>Value {typeof bar !== 'undefined' ? bar.reviews_summary_data.value : null}</span>
            </div>
          </div>
          <div>
            <Reviews props={typeof bar !== 'undefined' ? bar.reviews : null}/>
          </div>
        </div>
        <div id='rightColumn'>
          <div>
            <Reservation />
          </div>
          <div>
            <Favorite barId={barId} user={user}/>
          </div>
          <div id="google-map-container">
            <MapContainer props={typeof bar !== 'undefined' ? bar.bar : null}/>
          </div>
          <BarJSON props={typeof bar !== 'undefined' ? bar.bar : null}/>
        </div>
      </div>
    </div>
  );
}

export default Bar;