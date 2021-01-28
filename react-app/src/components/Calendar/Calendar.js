import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import "../Home/Home.css"
function CalendarContainer() {
  const [value, onChange] = useState(new Date());

  return (
      <DatePicker
        onChange={onChange}
        value={value}
              
      />
  );
}

export default CalendarContainer;