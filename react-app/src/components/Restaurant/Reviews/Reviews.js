import React from 'react'
import Review from './Review/Review'

function Reviews () { // all going to have to be replaced by state
  return (
    <div>
      <h2>See What X Reviews Are Saying</h2>
      {[1, 2, 3].map(image => {return <Review key={image}/>})}
    </div>
  );
}

export default Reviews;