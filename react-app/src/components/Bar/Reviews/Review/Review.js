import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import './review.css'
import { userData } from '../../../../store/users'

export default function Review({ props }) {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users);

  useEffect(() => {
    if (props !== null && typeof props !== 'undefined') {
      (async () => {
        await dispatch(userData(props.userId))
      })();
    }
  }, [dispatch]);

  console.log(users)
  console.log(props.userId)

  
  
  return (
    <div className='BorderBottom Review review-spacing'>
      <div id='review-left'>
        <div>
          <span id='first-name'>{ props !== null ? users.firstName : null }</span>
          <span>{ props !== null ? users.lastName : null }</span>
        </div>
        <div>
          <img id='profile-img' src={props !== null ? users.profileImg : null} />
        </div>
      </div>
      <div id='review-right'>
        {/* <div className='bottom-spacing'>Reservation Date Placeholder</div> */}
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
