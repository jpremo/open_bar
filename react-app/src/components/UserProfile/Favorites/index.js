import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from "react-router-dom";
import fetchUserFavorites from "../../../store/favorites"
import "./index.css"

const Favorites = ({user}) => {

    console.log("heeey!!!!!")
    console.log(user.id)

    const dispatch = useDispatch()
    const userId = user.id


    useEffect(() => {
        dispatch(fetchUserFavorites(userId))
    }, [dispatch])

    // const groupEvents = useSelector(state => state.groupEvents)

    if (!user) {
        return null;
    }

    return (
        <>
        <div id="favorite-container">
            <h4>Users FAVORITES</h4>
        </div>
        </>
    )
}

export default Favorites