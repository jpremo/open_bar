import React from 'react'
import './BarJSON.css'

export default function BarJSON({ props }) {

  return (
    <div>
      <h2 className='BorderBottom json-details'>Bar Details</h2>
      <ul id='bar-JSON'>
        <span>Hours:</span>
        <ul id='bar-JSON'>
          <li id='bar-JSON-element'>Sunday: {props !== null ? props.dayAndTime.sunday : 'closed'}</li>
          <li id='bar-JSON-element'>Monday: {props !== null ? props.dayAndTime.monday : 'closed'}</li>
          <li id='bar-JSON-element'>Tuesday: {props !== null ? props.dayAndTime.tuesday : 'closed'}</li>
          <li id='bar-JSON-element'>Wednesday: {props !== null ? props.dayAndTime.wednesday : 'closed'}</li>
          <li id='bar-JSON-element'>Thursday: {props !== null ? props.dayAndTime.thursday : 'closed'}</li>
          <li id='bar-JSON-element'>Friday: {props !== null ? props.dayAndTime.friday : 'closed'}</li>
          <li id='bar-JSON-element'>Saturday: {props !== null ? props.dayAndTime.saturday : 'closed'}</li>
        </ul>
        <li id='bar-JSON-element'>Bar Seats: {props !== null ? props.barSeats : null}</li>
        <li id='bar-JSON-element'>Street Address: {props !== null ? props.street : null}</li>
        <li id='bar-JSON-element'>Zip Code: {props !== null ? props.zipcode : null}</li>
        <li id='bar-JSON-element'>State: {props !== null ? props.state : null}</li>
        <li id='bar-JSON-element'>Phone Number: {props !== null ? props.phoneNumber : null}</li>
        <li id='bar-JSON-element'>Latitude: {props !== null ? props.latitude : null}, Longitude: {props !== null ? props.longitude : null}</li>
      </ul>
    </div>
  )
}
