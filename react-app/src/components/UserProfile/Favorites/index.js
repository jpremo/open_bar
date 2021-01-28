import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { fetchUserFavorites } from "../../../store/favorites"
import "./index.css"




const FavoriteCards = ({ userFav }) => {
    
    const id = userFav.id
    const img = userFav.bannerImg
    const name = userFav.name
    const seats = userFav.barSeats
    const street = userFav.street
    const state = userFav.state
    const phone = userFav.phoneNumber


    return (
        <>
            <div id="card">
                <NavLink to={`/bars/${id}`}>
                    <img alt="nope" src={img} />
                    <div id="bar-info-container">
                        <h4>{name}</h4>
                        <h5>{street}</h5>
                        <h5>{phone}</h5>
                        {/* <h5>{`Total Number of Seats ${seats}`}</h5> */}
                    </div>
                </NavLink>
            </div>
        </>
    )
}

const Favorites = ({sessionUser, params}) => {


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserFavorites(params))
    }, [dispatch])

    const userFavorites = useSelector(state => state.userFavorites)

    const intParams = parseInt(params)
    const sessId = sessionUser.id
    
    let button

    if (sessId === intParams) {
        console.log("TRUE") 
    } else {
        console.log("FALSE") 
    }

    return (
        <>
            <div id="favorite-container">
                <h4>Users FAVORITES</h4>
                <div id="cards">
                    {!userFavorites && <p>Loading...</p>}
                    {userFavorites && userFavorites.map(userFav => {
                        return <FavoriteCards userFav={userFav} params={params} key={userFav.id} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Favorites