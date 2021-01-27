import { Link } from 'react-router-dom'
import React from 'react'

function BarBox({ bar }) {
    let desc = bar.description
    if (bar.description.length > 500) desc = bar.description.slice(0, 500) + '...'
    let stars = Math.round(bar.ratings.overall * 2)
    const starsArr = []
    for (let i = 0; i < 5; i++) {
        if (stars <= 0) {
            starsArr.push('')
        } else if (stars === 1) {
            starsArr.push('star-half-filled')
        } else {
            starsArr.push('star-filled')
        }
        stars -= 2;
    }

    return (
        <div className='bar-box'>
            <Link to={`/bar/${bar.id}`} className='bar-link'>{bar.name}</Link>
            <div className='bar-address'>{bar.street} {bar.state} {bar.zipcode}</div>
            <div className='star-container'>
                {starsArr.map((el, ind) => {
                    return (
                        <div className={`star ${el}`} key={ind}>
                            <i className="fas fa-star fa-xs" id='innerstar-1' style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                        </div>)
                })}
                <div className='review-number'>{(bar.review_total === 1) ? `1 Review` : `${bar.review_total} Reviews`}</div>
            </div>
            <div className='ratings-list'>Ambience {Math.round(bar.ratings.ambience*10)/10} | Food {Math.round(bar.ratings.food*10)/10} | Service {Math.round(bar.ratings.service*10)/10} | Value {Math.round(bar.ratings.value*10)/10}</div>
            <div className='bar-description'>{desc}</div>
        </div>
    )
}

export default BarBox
