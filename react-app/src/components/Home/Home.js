// use rcfe
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeBanner from "./HomeBanner.jpg"
import CalendarContainer from "../Calendar/Calendar"
import DropDown from "../DropDown/DropDown"
import SearchBar from "../SearchResults/SearchBar"
import {homeDisplayBussinesses} from '../../store/bars'
import "./Home.css"
import BarList from '../Home/BarList'
import TimeSlot from '../TimeSlot/TimeSlot'
function Home() {

    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    let results = useSelector(state => state.bars.mostPopular)
    let wineresults = useSelector(state => state.bars.winery)
    let breweryresults = useSelector(state => state.bars.brewery)

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
                    <SearchBar/>
                </div>
            </div>
            <div className="bar-list">

                 <h3> Popular and Highly Reviewed</h3>
                <div id="list">
                <BarList barList={results} />       
                </div>
            
            </div>
            <div className="bar-list">
                 <h3 > Check Out Some Wine Options</h3>
                <div id="list">
                <BarList barList={wineresults} />       
                </div>
            
            </div>
            <div className="bar-list">
                 <h3> Get Your Buzz on At These Breweries</h3>
                <div id="list">
                <BarList barList={breweryresults} />       
                </div>
            
            </div>
        </div>
    )
}

export default Home
