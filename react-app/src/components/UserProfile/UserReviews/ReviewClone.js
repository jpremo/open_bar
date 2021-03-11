import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"

import './review.css';

const ReviewClone = ({ props }) => {



  const [bar, setBar] = useState({});

  useEffect(() => {
    if (props !== null && typeof props !== 'undefined') {
      (async () => {
        const response = await fetch(`/api/bars/${props.barId}`)
        const bar = await response.json();
        setBar(bar[1].bar);
      })();
    }
  }, [props]);

  
  
  return (
    <div className='BorderTop Review review-spacing'>
      <div id='review_left'>
        <div className='review_center'>
          <span id='ericks-first-name'>{ bar && bar.name }</span>
          
        </div>
        <div className='ericks-review_center'>
          <NavLink to={`/bars/${bar.id}`}>
            <img id='ericks-profile-img' src={bar && bar.bannerImg} alt='' />
          </NavLink>
        </div>
      </div>
      <div id='ericks-review_right'>
        <div className='bottom-spacing'>
          <span className='BorderRight'>Overall { props !== null ? props.overall : null }</span>
          <span className='BorderRight'>Food { props !== null ? props.food : null }</span>
          <span className='BorderRight'>Service { props !== null ? props.service : null }</span>
          <span className='BorderRight'>Ambience { props !== null ? props.ambience : null }</span>
          <span>Value { props !== null ? props.value : null }</span>
        </div>
        <div className='bottom-spacing'>{ props !== null ? props.review : null }</div>
      </div>
    </div>
  )
}

export default ReviewClone