import './SearchResults.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import BarList from './BarList'
import { searchBusinesses, clearSearchInfo } from '../../store/bars'
import MapContainer from '../MapContainer/MapContainer'
import SearchBar from './SearchBar'
import { useHistory } from 'react-router-dom';

function SearchResults() {
    const location = useLocation()
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    let results = useSelector(state => state.bars.searchResults)
    console.log('state', user)
    const history = useHistory()

    const loc = location.search.slice(location.search.indexOf('location=') + 9)
    const url = `/api/search/${location.search}`
    useEffect(() => {
        (async () => {
            if (!location.search.includes('location=') || !location.search.includes('business=')) {
                history.push(`/search/?business=&location=`)
            } else {
                dispatch(clearSearchInfo())
                await dispatch(searchBusinesses(url, loc, user.id))
            }
            setLoaded(true)

        })();
    }, [dispatch, loaded])
    if (loaded) {
        return (
            <div>
                <SearchBar setLoaded={setLoaded} loaded={loaded} />
                <BarList barList={results}/>
                <div id="google-map-container">
                    <MapContainer />
                </div>
            </div>
        )
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}

export default SearchResults
