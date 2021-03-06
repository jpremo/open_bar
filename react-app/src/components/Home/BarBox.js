import { NavLink } from 'react-router-dom'
import React from 'react'
import './Home.css'

function BarBox({ bar }) {

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
        <NavLink to={`/bars/${bar.id}`} style={{ textDecoration: 'none' }}>
        <div className='bar-box-home'>
        <div>
        <img className="picture-bar-box" src={bar.bannerImg} alt=''/>
        </div>
        <div id="info-bar-box">
         <h1>{bar.name}</h1>
            <div className='home-star-container'>
                            {starsArr.map((el, ind) => {
                                return (
                                    <div className={`star ${el}`} key={ind}>
                                        <i className="fas fa-star fa-xs" id='innerstar-1' style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                                    </div>)
                            })}
                            <div className='home-review-number'>{(bar.review_total === 1) ? `1 Review` : `${bar.review_total} Reviews`}</div>
                        </div>
                        </div>
        </div>
        </NavLink>
    )
}

export default BarBox
