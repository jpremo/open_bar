import BarBox from './BarBox'
import React from 'react'

function BarList({ barList, name }) {
    if (!barList || barList.length === 0) return (
        <>
            <div className='list-box'>
                <h1>{name}</h1>
                <div>
                    {/* <h2>No Results</h2> */}
                </div>
            </div>
        </>
    )
    return (
        <div className='home-list-box'>
            <h1>{name}</h1>
            <br></br>
            {barList.map((el, ind) => {
                return (
                    <BarBox bar={el} key={ind} />
                )
            })}
        </div>
    )
}

export default BarList
