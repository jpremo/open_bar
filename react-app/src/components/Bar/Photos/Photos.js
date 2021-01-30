import React from "react"
import Photo from "./Photo/Photo"

function Photos ({ props }) {

  const min = 0;
  const max = props !== null ? props.length : 1;
  const randomValues = []
  if (props !== null) {
    while (randomValues.length < 5) {
      const val = Math.floor(Math.random() * (max - min) + min);
      if (randomValues.indexOf(val) === -1) randomValues.push(val);
    }
  }
  
  return (
    <div>
      <h1>See { props !== null ? props.length : 0 } Photos</h1>
      <div id='photos'>
        <div id='first-photo'>
          { props !== null ? <Photo key={randomValues[0]} props={props[parseInt(randomValues[0])]} firstImg={true}/> : null }
        </div>
        <div id='stacked-photos'>
          { props !== null ? randomValues.splice(1, 5).map(num => {return <Photo key={num} props={props[parseInt(num)]} firstImg={false}/> }) : null }
        </div>
      </div>
    </div>
  );
}

export default Photos;