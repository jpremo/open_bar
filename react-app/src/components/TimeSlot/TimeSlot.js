import React, { useState } from 'react'
import Select from 'react-select'


const options = [
  { value: '1100', label: '11:00 AM' },
  { value: '1130', label: '11:30 AM' },
  { value: '1200', label: '12:00 PM' },
  { value: '1230', label: '12:30 PM' },
  { value: '1300', label: '1:00 PM' },
  { value: '1330', label: '1:30 PM' },
  { value: '1400', label: '2:00 PM' },
  { value: '1430', label: '2:30 PM' },
  { value: '1500', label: '3:00 PM' },
  { value: '1530', label: '3:30 PM' },
  { value: '1600', label: '4:00 PM' },
  { value: '1630', label: '4:30 PM' },
  { value: '1700', label: '5:00 PM' },
  { value: '1730', label: '5:30 PM' },
  { value: '1800', label: '6:00 PM' },
  { value: '1830', label: '6:30 PM' },
  { value: '1900', label: '7:00 PM' },
  { value: '1930', label: '7:30 PM' },
  { value: '2000', label: '8:00 PM' },
  { value: '2030', label: '8:30 PM' },
  { value: '2100', label: '9:00 PM' },
  { value: '2130', label: '9:30 PM' },
  { value: '2200', label: '10:00 PM' },
  { value: '2230', label: '10:30 PM' },
  { value: '2300', label: '11:00 PM' },
  { value: '2330', label: '11:30 PM' },
  { value: '0000', label: '12:00 AM' },
  { value: '0030', label: '12:30 AM' },
  { value: '0100', label: '1:00 AM' },
  { value: '0130', label: '1:30 AM' },
  { value: '0200', label: '2:00 AM' },
  { value: '0230', label: '2:30 AM' },
]


function TimeSlot() {
   const[time, setTime] = useState({})

    const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid black',
    padding: 20,
   
  }),
  valueContainer: () => ({
    // none of react-select's styles are passed to <Control />
    width: 110,
    height: 48,
    borderRadius: 5,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

    return (
        <div id="dropdown">
            <Select styles={customStyles} id="select-time-drop" options={options} placeholder=" Time Slot" onChange={setTime} />
        </div>
         
    )
}

export default TimeSlot
