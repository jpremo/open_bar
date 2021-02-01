import React, { useState } from 'react'
import TimeSlot from '../TimeSlot/TimeSlot'
import Calendar from '../Calendar/Calendar'
import DropDown from '../DropDown/DropDown'
import { format } from 'date-fns'
import '../SearchResults/SearchBar.css'
import { useSelector } from 'react-redux'
import './Reservation.css'

function Reservation() {
    const [value, onChange] = useState(new Date())
    const [people, setPeople] = useState({})
    const [time, setTime] = useState({ value: format(value, 'H') })

    const user = useSelector(state => state.session.user);
    const bar = useSelector(state => state.bars['1']);

    const makeReservation = (e) => {
        e.preventDefault();

        if (value === undefined || people.value === undefined || time.label  === undefined) {
            alert('Reservation incomplete. Please fill out all fields to make a reservation.')
        } else if (typeof user === 'undefined' || user === null) {
            alert('Please login (or signup!) to complete your reservation.')
        }
        else {
            const month = value.getMonth() + 1;
            const day = value.getDate();
            const year = value.getFullYear();
            const date = `${month}/${day}/${year}`;

            fetch('/api/search/reservation', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    barId: bar.bar.id,
                    date,
                    time: time.label,
                    userId: user.id,
                    partySize: people.value,
                })
            });

            alert('Reservation Made! Thank you very much');
        }
    }

    return (
      <>
        <h2 className='reservation-title'>Make a Reservation</h2>
        <div id='drop-downs'>
            <Calendar value={value} onChange={onChange} />
            <DropDown people={people} setPeople={setPeople} />
            <TimeSlot time={time} setTime={setTime}/>
        </div>
        <div id='reservation_button-container'>
            <button id='opening-button' onClick={makeReservation}>Request a Reservation</button>
        </div>
      </>
    )
}

export default Reservation