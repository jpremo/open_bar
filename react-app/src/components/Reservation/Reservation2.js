import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import TimeSlot from '../TimeSlot/TimeSlot'
import Calendar from '../Calendar/Calendar'
import DropDown from '../'
import { format } from 'date-fns'
import { parse } from 'query-string'
import './SearchBar.css'

function Reservation({ setLoaded, loaded, bus, loc }) {
    const [searchBusiness, setSearchBusiness] = useState('')
    const [searchLocation, setSearchLocation] = useState('')
    const [value, onChange] = useState(new Date()); //for calendar
    const [people, setPeople] = useState({})
    const [time, setTime] = useState({ value: format(value, 'H') })
    const history = useHistory()
    const location = useLocation()
    console.log(location)
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
    useEffect(() => {
        let vals = parse(location.search)
        console.log('vals', vals)
        if (vals.business) setSearchBusiness(vals.business)
        if (vals.location) setSearchLocation(vals.location)
        if (vals.date) onChange(new Date(vals.date))
        if (vals.guests) {
            const opt = options.filter((el) => el.value === vals.guests)
            setPeople(opt[0])
        }
        if (vals.time) {
            const opt = timeOptions.filter((el) => el.value === vals.time)
            setTime(opt[0])
        }
    }, [])
    const search = (event) => {
        if (event.keyCode === 13) {
            const day = format(value, 'EEEE').toLowerCase()
            const formattedDate = format(value, 'MM/dd/yyyy');
            history.push(`/search/?business=${searchBusiness}&time=${time.value}&day=${day}&date=${formattedDate}&guests=${people.value}&location=${searchLocation}`)
            setLoaded(false)
        }
    }
    const searchClick = (event) => {
        history.push(`/search/?business=${searchBusiness}&location=${searchLocation}`)
        setLoaded(false)
    }
    return (
        <>
            {/* <div id='search-bars'>
                <i id='search-icon' className="fas fa-search" onClick={searchClick}></i>
                <input className='search-bar' value={searchBusiness} placeholder='Business' onChange={(e) => setSearchBusiness(e.target.value)} onKeyUp={search} />
                <input className='search-bar' value={searchLocation} placeholder='Location' onChange={(e) => setSearchLocation(e.target.value)} onKeyUp={search} />
            </div> */}
            <div id='drop-downs'>
                <Calendar value={value} onChange={onChange} />
                <DropDown people={people} setPeople={setPeople} />
                <TimeSlot time={time} setTime={setTime} />
            </div>
        </>
    )
}

export default Reservation