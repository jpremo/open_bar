import React from "react";
import DatePicker from "react-date-picker";
import "../Home/Home.css";
function CalendarContainer({ value, onChange }) {
  // const [value, onChange] = useState(new Date());

  return <DatePicker onChange={onChange} value={value} minDate={new Date()} />;
}

export default CalendarContainer;
