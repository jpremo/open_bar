import React, { useState } from 'react'
import Select from 'react-select'


const options = [
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


function TimeSlot({time, setTime}) {
  //  const[time, setTime] = useState({})

    const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid black',
    padding: 20,

  }),
  valueContainer: () => ({
    // none of react-select's styles are passed to <Control />
    width: 110,
    height: 25,
    borderRadius: 5,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

if (!time || time.label === "defaulted"){
  time = ""
}

    return (
        <div id="timedropdown">
            <Select styles={customStyles} id="select-time-drop" value={time} options={options} placeholder="Select Time" onChange={setTime} />
        </div>

    )
}

export default TimeSlot
