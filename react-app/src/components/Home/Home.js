// use rcfe
import React from 'react'
import HomeBanner from "./HomeBanner.jpg"
import CalendarContainer from "../Calendar/Calendar"
import MapContainer from "../MapContainer/MapContainer"

function Home() {
    return (
        <div>
            <img src={HomeBanner}/>
            <h1>Find Your Table For Any Occasion</h1>
            <div>
                <CalendarContainer/>
            </div>
            <div id="google-map-container">
                <MapContainer/>
            </div>
        </div>
    )
}

export default Home
