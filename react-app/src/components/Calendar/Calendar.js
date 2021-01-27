import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

function CalendarContainer() {
 const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      showTimeSelect
      includeTimes={[
        setHours(setMinutes(new Date(), 0), 17),
        setHours(setMinutes(new Date(), 30), 18),
        setHours(setMinutes(new Date(), 30), 19),
        setHours(setMinutes(new Date(), 30), 17)
      ]}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

export default CalendarContainer;