// use rcfe
import React from 'react'
import HomeBanner from "./HomeBanner.jpg"
import CalendarContainer from "../Calendar/Calendar"
import MapContainer from "../MapContainer/MapContainer"

function Home() {
    return (
        <div>
            <div id="home-image-container">
            <img id="banner-image" src={HomeBanner} />
            <h1 className="info-on-image">Find Your Table For Any Occasion</h1>
              <CalendarContainer/>
            </div>
            <div id="google-map-container">
                <MapContainer/>
            </div>
         </div>
    )
}

export default Home
