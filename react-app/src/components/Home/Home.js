// use rcfe
import React from 'react'
import HomeBanner from "./HomeBanner.jpg"
import CalendarContainer from "../Calendar/Calendar"
import MapContainer from "../MapContainer/MapContainer"
import DropDown from "../DropDown/DropDown"

import "./Home.css"
function Home() {
    return (
        <div>
            <div id="home-image-container">
                 <img src={HomeBanner} />
                <div id="home-page-overlay">
                    <h1>Find Your Table For Any Occasion</h1>
                    <div id="search-container">
                        <div id="calender-search">
                            <CalendarContainer/>
                        </div>
                        <div id="people-search">
                            <DropDown/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="bar-list">
                <h1> Whenever, wherever you’re thirsty — find it on OpenBar</h1>
            </div>
        </div>
    )
}

export default Home
