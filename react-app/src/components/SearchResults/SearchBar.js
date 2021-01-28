import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './SearchBar.css'
function SearchBar({setLoaded, loaded}) {
    const [searchBusiness, setSearchBusiness] = useState('')
    const [searchLocation, setSearchLocation] = useState('')
    const history = useHistory()
    const search = (event) => {
        if (event.keyCode === 13) {
            debugger
            console.log(loaded)
            history.push(`/search/?business=${searchBusiness}&location=${searchLocation}`)
            setLoaded(false)
        }
    }
    const searchClick = (event) => {
        history.push(`/search/?business=${searchBusiness}&location=${searchLocation}`)
        setLoaded(false)
    }
    return (
        <div id='search-bars'>
            <i id='search-icon' className="fas fa-search" onClick={searchClick}></i>
            <input className='search-bar' value={searchBusiness} placeholder='Business' onChange={(e) => setSearchBusiness(e.target.value)} onKeyUp={search} />
            <input className='search-bar' value={searchLocation} placeholder='Location' onChange={(e) => setSearchLocation(e.target.value)} onKeyUp={search} />
        </div>
    )
}

export default SearchBar