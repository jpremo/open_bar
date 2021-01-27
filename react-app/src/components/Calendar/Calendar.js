import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

function CalendarContainer() {

 const [startDate, setStartDate] = useState(new Date());

 return (
    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
  );
};


export default CalendarContainer;