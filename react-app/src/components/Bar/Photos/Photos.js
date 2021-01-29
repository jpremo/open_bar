import React from "react"
import Photo from "./Photo/Photo"

function Photos () {
  return (
    <div>
      <h1>See X Photos</h1>
      <div id='photos'>
        <div id='first-photo'>
          {[1].map(imageNum => {return <Photo key={imageNum} props={imageNum}/>})}
        </div>
        <div id='stacked-photos'>
          {[2, 3, 4, 5].map(imageNum => {return <Photo key={imageNum} props={imageNum}/>})}
        </div>
      </div>
    </div>
  );
}

export default Photos;