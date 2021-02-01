import React, { useEffect, useState } from 'react'
import TimeSlot from '../TimeSlot/TimeSlot'
import Calendar from '../Calendar/Calendar'
import DropDown from '../DropDown/DropDown'
import { format } from 'date-fns'
import '../SearchResults/SearchBar.css'
import { useDispatch, useSelector } from 'react-redux'
import './Reservation.css'
import { getReservations } from '../../store/reservations'
import Select from 'react-select'

function Reservation() {
    const [value, onChange] = useState(new Date())
    const [people, setPeople] = useState({})
    const [time, setTime] = useState({ value: format(value, 'H') })

    const user = useSelector(state => state.session.user);
    const bar = useSelector(state => state.bars['1']);

    // const reservations = useSelector(state => state.reservations);
    // console.log(reservations)
    // for (let key in reservations) {
    //     console.log(key, reservations[key])
    // }
    
    // const dispatch = useDispatch();
    // if (typeof user !== 'undefined' && user !== null && user.id !== null && typeof bar !== 'undefined') {
    //     dispatch(getReservations(bar.bar.id, user.id));
    // }

    // const [reserves, setReserves] = useState([]);
    // const userReservations = async () => {
    //     if (typeof user !== 'undefined' && user !== null && user.id !== null && typeof bar !== 'undefined') {
    //         let res = await fetch(`/api/bars/${bar.bar.id}/reservations/user/${user.id}`, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         res = await res.json();
    //         setReserves(res);
    //         console.log(reserves)
    //     }
    // }

    const makeReservation = (e) => {
        e.preventDefault();

        if (typeof user === 'undefined' || user === null || user.id === null) {
            alert('Please login (or signup!) to complete your reservation.')
        } else if (value === undefined || people.value === undefined || time.label  === undefined) {
            alert('Reservation incomplete. Please fill out all fields to make a reservation.')
        } else {
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

            onChange(new Date());
            setPeople({});
            setTime({ value: format(value, 'H') });

            alert('Reservation Made! Thank you very much');

            // dispatch(getReservations(bar.bar.id, user.id));
        }
    }

    // useEffect( () => {
    //     userReservations()
    // }, [])

    return (
      <>
        <div>
            <h2 className='reservation-title'>Make a Reservation</h2>
            <div id='drop-downs'>
                <Calendar value={value} onChange={onChange} />
                <DropDown people={people} setPeople={setPeople} />
                <TimeSlot time={time} setTime={setTime} />
            </div>
            <div id='reservation_button-container'>
                <button id='opening-button' onClick={makeReservation}>Request a Reservation</button>
            </div>
        </div>
        <div class='hidden-reservation'>
            {/* { (reservations.length > 1) ? <div>You have {reservations.length} Reservations</div> : <div>Empty</div> } */}
        </div>
      </>
    )
}

export default Reservation