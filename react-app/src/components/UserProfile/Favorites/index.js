import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { fetchUserFavorites } from "../../../store/favorites"
import "./index.css"

const Favorites = ({user}) => {

    const { userId } = useParams()
    // console.log(user)
    

    const dispatch = useDispatch()
    // const userId = userState.id


    useEffect(() => {
        dispatch(fetchUserFavorites(userId))
    }, [dispatch])


    // if (userId) {
    //     return null;
    // }

    return (
        <>
            <div id="favorite-container">
                <h4>Users FAVORITES</h4>
                {/* {!userState && <h3>state not found</h3>} */}
            </div>
        </>
    )
}

export default Favorites