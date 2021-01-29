import React, { useEffect, useState } from 'react'
import TimeSlot from '../TimeSlot/TimeSlot'
import Calendar from '../Calendar/Calendar'
import DropDown from '../DropDown/DropDown'
import { format, isDate } from 'date-fns'
import '../SearchResults/SearchBar.css'
import { useSelector } from 'react-redux'

function Reservation() {
    const [value, onChange] = useState(new Date())
    const [people, setPeople] = useState({})
    const [time, setTime] = useState({ value: format(value, 'H') })

    const options = [
        { value: '1', label: '1 Person' },
        { value: '2', label: '2 People' },
        { value: '3', label: '3 People' },
        { value: '4', label: '4 People' },
        { value: '5', label: '5 People' },
        { value: '6', label: '6 People' },
        { value: '7', label: '7 People' },
        { value: '8', label: '8 People' },
        { value: '9', label: '9 People' },
        { value: '10', label: '10 People' },
        { value: '11', label: '11 People' },
        { value: '12', label: '12 People' },
        { value: '13', label: '13 People' },
        { value: '14', label: '14 People' },
        { value: '15', label: '15 People' },
        { value: '16', label: '16 People' },
        { value: '17', label: '17 People' },
        { value: '18', label: '18 People' },
        { value: '19', label: '19 People' },
        { value: '20', label: '20 People' }
    ]

    const timeOptions = [
        { value: '11', label: '11:00 AM' },
        { value: '11.5', label: '11:30 AM' },
        { value: '12', label: '12:00 PM' },
        { value: '12.5', label: '12:30 PM' },
        { value: '13', label: '1:00 PM' },
        { value: '13.5', label: '1:30 PM' },
        { value: '14', label: '2:00 PM' },
        { value: '14.5', label: '2:30 PM' },
        { value: '15', label: '3:00 PM' },
        { value: '15.5', label: '3:30 PM' },
        { value: '16', label: '4:00 PM' },
        { value: '16.5', label: '4:30 PM' },
        { value: '17', label: '5:00 PM' },
        { value: '17.5', label: '5:30 PM' },
        { value: '18', label: '6:00 PM' },
        { value: '18.5', label: '6:30 PM' },
        { value: '19', label: '7:00 PM' },
        { value: '19.5', label: '7:30 PM' },
        { value: '20', label: '8:00 PM' },
        { value: '20.5', label: '8:30 PM' },
        { value: '21', label: '9:00 PM' },
        { value: '21.5', label: '9:30 PM' },
        { value: '22', label: '10:00 PM' },
        { value: '22.5', label: '10:30 PM' },
        { value: '23', label: '11:00 PM' },
        { value: '23.5', label: '11:30 PM' },
        { value: '1', label: '12:00 AM' },
        { value: '1.5', label: '12:30 AM' },
        { value: '2', label: '1:00 AM' },
        { value: '2.5', label: '1:30 AM' },
        { value: '3', label: '2:00 AM' },
        { value: '3.5', label: '2:30 AM' },
      ]

    const user = useSelector(state => state.session.user);
    const bar = useSelector(state => state.bars['1']);

    const makeReservation = (e) => {
        e.preventDefault();

        if (value === undefined || people.value === undefined || time.label  === undefined) {
            alert('Reservation incomplete. Please fill out all fields to make a reservation.')
        } else if (typeof user === 'undefined') {
            alert('Please login (or signup!) to complete your reservation.')
        }
        else {
            const month = value.getMonth() + 1;
            const day = value.getDate();
            const year = value.getFullYear();
            const date = `${month}/${day}/${year}`;

            fetch('http://localhost:5000/api/search/reservation', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    barId: bar.bar.id,
                    date,
                    time: time.value,
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
            <TimeSlot time={time} setTime={setTime} />
        </div>
        <button id='opening-button' onClick={makeReservation}>Request a Reservation</button>
      </>
    )
}

export default Reservation