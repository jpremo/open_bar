import CalendarContainer from '../Calendar/Calendar'
import React, { useState } from 'react'
import TimePicker from 'react-time-picker'

export default function Reservation() {
  const [value, onChange] = useState()

  // const today = new Date();
  // const currentHour = today.getHours();
  // const currentMinute = today.getMinutes();
  // const currentSecond = today.getSeconds();

  const dropdownOptionsForNumberOfPeople = []
  for (let i = 3; i < 20; i++) {
    dropdownOptionsForNumberOfPeople.push(i)
  }

  return (
    <div id='reservation'>
      <h2 className='reservation-title'>Make a Reservation</h2>
      <div id='make-reservation-container'>
        <div>
          <CalendarContainer />
        </div>
        <div>
          <TimePicker
            onChange={onChange}
            value={value}
          />
        </div>
        <div>
          <select id='party-size-dropdown'>
            <option>For 1</option>
            <option defaultValue>For 2</option>
            {dropdownOptionsForNumberOfPeople.map(num => {
              return <option key={num}>For {num}</option>
            })}
            <option>For 20+</option>
          </select>
        </div>
      </div>
      <div>
        <button id='opening-button'>Find an opening</button>
      </div>
    </div>
  )
}
