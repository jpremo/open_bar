import {NavLink, Link} from 'react-router-dom'
import React from 'react'
import './Home.css'

function BarBox({bar}) {
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

    return(
        <div className='bar-box-home'>
        <div>
        <img id="picture-bar-box" src={bar.bannerImg}/>
        </div>
        <div id="info-bar-box">
         <Link to={`/bars/${bar.id}`} className='bar-link'>{bar.name}</Link>
            <div className='home-star-container'>
                            {starsArr.map((el, ind) => {
                                return (
                                    <div className={`star ${el}`} key={ind}>
                                        <i className="fas fa-star fa-xs" id='innerstar-1' style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                                    </div>)
                            })}
                            <div className='review-number'>{(bar.review_total === 1) ? `1 Review` : `${bar.review_total} Reviews`}</div>
                        </div>
                        </div>
        </div>
    )
}

export default BarBox
