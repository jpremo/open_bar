import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../../store/users';
import { barDataDisplay } from '../../../store/bars';
import './review.css';

const ReviewClone = ({ props }) => {

//   console.log(props)

  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users);
  const bar = useSelector(state => state.bars[1])
  console.log(bar)

  let user;

  if (typeof users !== 'undefined' && props !== null && typeof props !== 'undefined') {
    let i = 0;
    while (i < users.length) {
      if (users[i]['id'] === props.userId) {
        user = users[i];
        break;
      }
      i++;
    }
  }

  useEffect(() => {
    if (props !== null && typeof props !== 'undefined') {
      (async () => {
        await dispatch(userData(props.userId))
        await dispatch(barDataDisplay(props.barId))
      })();
    }
  }, [dispatch, props]);

  
  
  return (
    <div className='BorderTop Review review-spacing'>
      <div id='review_left'>
        <div className='review_center'>
          <span id='first-name'>{ bar !== null && typeof user !== 'undefined' ? user.firstName : null }</span>
          <span>{ props !== null && typeof user !== 'undefined' ? user.lastName : null }</span>
        </div>
        <div className='review_center'>
          <img id='profile-img' src={props !== null && typeof user !== 'undefined' ? user.profileImg : null} alt=''/>
        </div>
      </div>
      <div id='review_right'>
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