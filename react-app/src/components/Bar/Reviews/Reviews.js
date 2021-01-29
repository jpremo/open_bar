import React from 'react'
import Review from './Review/Review'

function Reviews ({ props }) {
  return (
    <div>
      <h2>See What {props !== null ? props.length : 0} Reviews Are Saying</h2>
      { props !== null ? props.map(review => {return <Review key={review.id} props={review}/>}) : null}
    </div>
  );
}

export default Reviews;

