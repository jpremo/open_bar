// use rcfe
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeBanner from "./HomeBanner.jpg"
import CalendarContainer from "../Calendar/Calendar"
import DropDown from "../DropDown/DropDown"
import {homeDisplayBussinesses} from '../../store/bars'
import "./Home.css"
import BarList from '../Home/BarList'
import TimeSlot from '../TimeSlot/TimeSlot'
function Home() {

    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    let results = useSelector(state => state.bars.mostPopular)

    useEffect(() => {
        (async () => {
            await dispatch(homeDisplayBussinesses())
        })();
    }, [dispatch])

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
                         <div id="time-search">
                            <TimeSlot/>
                        </div>
                        <div id="people-search">
                            <DropDown/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="bar-list">
                <h1> Whenever, wherever you’re thirsty — find it on OpenBar</h1>

                 <h3> Popular and Highly Reviewed</h3>
                <div id="list">
                <BarList barList={results} />       
                </div>
            
            </div>
        </div>
    )
}

export default Home
