import './SearchResults.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import BarList from './BarList'
import { searchBusinesses, clearSearchInfo } from '../../store/bars'
import SearchMap from '../MapContainer/SearchMap'
import SearchBar from './SearchBar'
import { useHistory } from 'react-router-dom';

function SearchResults() {
    const location = useLocation()
    const [loaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    let results = useSelector(state => state.bars.searchResults)
    let center = useSelector(state => state.bars.searchCenter)
    console.log('state', user)
    const history = useHistory()
    const locLoc = location.search.indexOf('location=') + 9
    const loc = location.search.slice(locLoc).split('%20').join(' ')
    const busLoc = location.search.indexOf('business=') + 9
    const bus = location.search.slice(busLoc, locLoc-10).split('%20').join(' ')
    const url = `/api/search/${location.search}`

    const pageBar = (resultNumber, currentPage) => {
        const totalPages = Math.ceil(resultNumber / 10)
        const changePage = (event) => {
            const newPage = event.target.id.split('-')[1]
            if (newPage !== page) {
                switch (newPage) {
                    case 'Prev': setPage(page - 1); break;
                    case 'Next': setPage(page + 1); break;
                    case 'First': setPage(1); break;
                    case 'Last': setPage(totalPages); break;
                    default: setPage(Number(newPage))
                }

            }
        }
        if (totalPages > 1) {
            const arr = []
            if (currentPage !== 1) arr.push('First', 'Prev')
            let starter = currentPage
            if (currentPage + 2 > totalPages) starter = totalPages - 4;
            if (currentPage - 2 < 1 || starter < 1) starter = 1;
            for (let i = starter; i < starter + 5; i++) {
                if (i <= totalPages) arr.push(`${i}`)
            }
            if (currentPage !== totalPages) arr.push('Next', 'Last')

            return (
                <>
                    <div id='search-page-bar'>
                        {arr.map((el) => {
                            if (el == currentPage) {
                                return (
                                    <div className='search-page-link search-page-link--current' id={`page-${el}`} key={el} onClick={changePage}>{el}</div>
                                )
                            }
                            return (
                                <div className='search-page-link' id={`page-${el}`} key={el} onClick={changePage}>{el}</div>
                            )
                        })}
                    </div>
                    <span>{totalPages} Pages Total</span>
                </>
            )
        }
        if (totalPages === 0) return (<h1>There are no results for this search!</h1>)
    }

    useEffect(() => {
        (async () => {
            if (!location.search.includes('location=') || !location.search.includes('business=')) {
                history.push(`/search/?business=&location=`)
            } else {
                await dispatch(clearSearchInfo())
                await dispatch(searchBusinesses(url, loc, user.id))
            }
            setLoaded(true)

        })();
    }, [dispatch, loaded])
    if (loaded) {
        let pageContent = []
        let resultCount = 0
        if (results) {
            pageContent = results.slice((page - 1) * 10, page * 10);
            resultCount = results.length;
        }
        return (
            <div id="results-wrapper">
                <SearchBar setLoaded={setLoaded} loaded={loaded} bus={bus} loc={loc}/>
                    <div id="google-map-container" className='search-results-map'>
                        <SearchMap center={center} bars={pageContent}/>
                    </div>
                <div id='main-content-wrapper'>
                    <BarList barList={pageContent} />
                    <div id='page-bar-wrapper'>
                        {pageBar(resultCount, page)}
                    </div>
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
