import React from 'react'

export default function Review() {
  return (
    <div className='BorderBottom Review review-spacing'>
      <div id='review-left'>
        <h4>Placeholder for User Profile</h4>
      </div>
      <div id='review-right'>
        <div className='bottom-spacing'>Reservation Date Placeholder</div>
        <div className='bottom-spacing'>
          <span className='BorderRight'>Overall</span>
          <span className='BorderRight'>Food</span>
          <span className='BorderRight'>Service</span>
          <span className='BorderRight'>Ambience</span>
          <span>Value</span>
        </div>
        <div className='bottom-spacing'>Body of text</div>
      </div>
    </div>
  )
}
