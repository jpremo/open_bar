import React from "react";
import "./BarJSON.css";

export default function BarJSON({ props }) {
  const dayAndTimeConverter = () => {
    if (props !== null) {
      let eachDayOpenHours = {};
      const dayAndTime = props.dayAndTime;
      for (const [key, value] of Object.entries(dayAndTime)) {
        const splitString = value.split("-");
        let [openingTime, closingTime] = splitString;

        openingTime = parseInt(openingTime);
        closingTime = parseInt(closingTime);

        let openInTheMorning = true;
        let closeInTheMorning = true;

        if (openingTime === 0) {
          openingTime = 12;
        } else if (openingTime === 12) {
          openInTheMorning = false;
        } else if (openingTime > 12) {
          openingTime %= 12;
          openInTheMorning = false;
        }

        if (closingTime === 0) {
          closingTime = 12;
        } else if (closingTime === 12) {
          closeInTheMorning = false;
        } else if (closingTime > 12) {
          closingTime %= 12;
          closeInTheMorning = false;
        }

        openingTime = `${openingTime}${openInTheMorning ? "am" : "pm"}`;
        closingTime = `${closingTime}${closeInTheMorning ? "am" : "pm"}`;

        const openHours = openingTime + " to " + closingTime;

        eachDayOpenHours[key] = openHours;
      }
      return eachDayOpenHours;
    }
  };

  const eachDayOpenHours = dayAndTimeConverter();

  return (
    <div>
      <h2 className="BorderBottom json-details">Bar Details</h2>
      <ul id="bar-JSON">
        <ul id="bar-JSON">
          <li id="bar-JSON-element">
            Sunday Hours:{" "}
            {props !== null ? eachDayOpenHours["sunday"] : "closed"}
          </li>
          <li id="bar-JSON-element">
            Monday Hours:{" "}
            {props !== null ? eachDayOpenHours["monday"] : "closed"}
          </li>
          <li id="bar-JSON-element">
            Tuesday Hours:{" "}
            {props !== null ? eachDayOpenHours["tuesday"] : "closed"}
          </li>
          <li id="bar-JSON-element">
            Wednesday Hours:{" "}
            {props !== null ? eachDayOpenHours["wednesday"] : "closed"}
          </li>
          <li id="bar-JSON-element">
            Thursday Hours:{" "}
            {props !== null ? eachDayOpenHours["thursday"] : "closed"}
          </li>
          <li id="bar-JSON-element">
            Friday Hours:{" "}
            {props !== null ? eachDayOpenHours["friday"] : "closed"}
          </li>
          <li id="bar-JSON-element">
            Saturday Hours:{" "}
            {props !== null ? eachDayOpenHours["saturday"] : "closed"}
          </li>
        </ul>
        <li id="bar-JSON-element">
          Bar Seats: {props !== null ? props.barSeats : null}
        </li>
        <li id="bar-JSON-element">
          Street Address: {props !== null ? props.street : null}
        </li>
        <li id="bar-JSON-element">
          Zip Code: {props !== null ? props.zipcode : null}
        </li>
        <li id="bar-JSON-element">
          State: {props !== null ? props.state : null}
        </li>
        <li id="bar-JSON-element">
          Phone Number: {props !== null ? props.phoneNumber : null}
        </li>
        <li id="bar-JSON-element">
          Latitude: {props !== null ? props.latitude : null}, Longitude:{" "}
          {props !== null ? props.longitude : null}
        </li>
      </ul>
    </div>
  );
}
