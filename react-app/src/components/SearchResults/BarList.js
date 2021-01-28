import BarBox from './BarBox'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function BarList({ barList, name, user }) {
    const [confirmScreen, setConfirmScreen] = useState(false)
    const history = useHistory()
    let futureReservations
    if(user) futureReservations = user.futureReservations
    const confirmReservation = (e) => {
        if(user) {
            setConfirmScreen(e.currentTarget.id)
        } else {
            history.push('/login')
        }
    }
    const confirmReturn = () => {
        if (confirmScreen) {
            const split = confirmScreen.split('-')
            const date = split[1]
            const time = split[2]
            const idComp = split[0]
            const rest = barList.filter(bar => {
                return bar.id === Number(idComp)
            })[0]
            const bookReservation = async () => {
                const res = await fetch('/api/search/reservation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        barId: idComp,
                        date,
                        time,
                        userId: user.id,
                        partySize: 2,
                    })
                })
                setConfirmScreen(false)
                history.push('/bars/'+idComp)
            }
            return (
                <div>
                    <div>Confirm Reservation for {rest.name} at {split[2]} on {split[1]}? </div>
                    <div className='search-page-link' onClick={bookReservation}> Confirm</div>
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }
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
        <div className='list-box'>
            <h1>{name}</h1>
            {confirmReturn()}
            {barList.map((el, ind) => {
                let res = false
                let match
                if(futureReservations){
                    match = futureReservations.filter((reserve) => {
                        return reserve.barId === el.id
                    })
                }
                if(match.length) res = match[0]
                return (
                    <BarBox bar={el} reservation={res} key={ind} ind={ind} confirmReservation={confirmReservation} />
                )
            })}
        </div>
    )
}

export default BarList
