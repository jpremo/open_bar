// use rcfe
import React from 'react'
import HomeBanner from "./HomeBanner.jpg"
import CalendarContainer from "../Calendar/Calendar"
import MapContainer from "../MapContainer/MapContainer"
import "./Home.css"
function Home() {
    return (
        <div>
            <div id="home-image-container">
                 <img src={HomeBanner} />
                <div id="home-page-overlay">
                    <h1>Find Your Table For Any Occasion</h1>
                    <div>
                    <CalendarContainer/>
                    </div>
                </div>
            </div>
            <div id="google-map-container">
                <MapContainer/>
            </div>
        </div>
    )
}

export default Home
