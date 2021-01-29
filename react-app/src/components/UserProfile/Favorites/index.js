import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { fetchUserFavorites, deleteFavorite } from "../../../store/favorites"
import "./index.css"


const FavoriteCards = ({ userFav, hidden, params }) => {

    const barId = userFav.id
    const img = userFav.bannerImg
    const name = userFav.name
    const seats = userFav.barSeats
    const street = userFav.street
    const state = userFav.state
    const phone = userFav.phoneNumber
    

    const dispatch = useDispatch()


    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(deleteFavorite(barId, params))
    }


    return (
        <>
            <div id="card">
                <button hidden={hidden} onClick={handleSubmit}>unfavorite</button>
                <NavLink to={`/bars/${barId}`}>
                    <img alt="nope" src={img} />
                    <div id="bar-info-container">
                        <h4>{name}</h4>
                        <h5>{street}</h5>
                        {/* <h5>{`Total Number of Seats ${seats}`}</h5> */}
                    </div>
                </NavLink>
            </div>
        </>
    )
}

const Favorites = ({ sessionUser, params }) => {

    const [deleteHidden, setDeleteHidden] = useState(false)

    const dispatch = useDispatch()

    const userFavorites = useSelector(state => state.userFavorites)
    const intParams = parseInt(params)
    const sessId = sessionUser.id


    useEffect(() => {

        dispatch(fetchUserFavorites(params))

        if (sessId === intParams) {
            setDeleteHidden(false)
        } else {
            setDeleteHidden(true)
        }

    }, [dispatch])


    return (
        <>
            <div id="favorite-container">
                <h4>Users FAVORITES</h4>
                <div id="cards">
                    {!userFavorites && <p>Loading...</p>}
                    {userFavorites && userFavorites.map(userFav => {
                        return <FavoriteCards userFav={userFav} params={params} hidden={deleteHidden} key={userFav.id} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Favorites