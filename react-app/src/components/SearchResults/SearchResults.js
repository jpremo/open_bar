import './SearchResults.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import BarList from './BarList'
import { searchBusinesses, clearSearchInfo } from '../../store/bars'
import MapContainer from '../MapContainer/MapContainer'
import SearchBar from './SearchBar'

function SearchResults() {
    const location = useLocation()
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    console.log('state', user)
    const loc = location.search.slice(location.search.indexOf('location=') + 9)
    useEffect(() => {
        dispatch(clearSearchInfo())
        const url = `/api/search/${location.search}`
        // console.log('url', url, loc, user, user.id)
        dispatch(searchBusinesses(url, loc, user.id))
        setRefresh(false)
    }, [dispatch, refresh])
    return (
        <div>
            <SearchBar setRefresh={setRefresh}/>
            <div id="google-map-container">
                <MapContainer/>
            </div>
         </div>
    )
}

export default SearchResults
