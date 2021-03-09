import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import Favorites from "./Favorites"

import "./index.css"




function User() {
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState({})
    // Notice we use useParams here instead of getting the params
    // From props.
    const { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            return
        }

        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();

        (async () => {
            const response = await fetch(`/api/users/${userId}/userReviews`);
            const reviews = await response.json();
            setReviews(reviews)
        })();
    }, [userId]);

    const userState = useSelector(state => state.session.user)

    const sessId = userState.id
    console.log(reviews)

    let isUserProfile

    if (userId === sessId) {
        isUserProfile = "a thing"
    }

    if (!user) {
        return null;
    }

    return (
        <>
            <div id="user-profile-container">
                <div id="user-intro">
                    <div id="img-box">
                        <img alt="nope" src={user.profileImg} />
                    </div>
                    <div id="user-info-box">
                        <div id="user-info-text">
                            <h3>{`${user.firstName} ${user.lastName}`}</h3>
                            <h5>{`Username: ${user.username}`}</h5>
                        </div>
                    </div>
                    <NavLink to={`/bars/create`}>
                        <div id="create-bar-button">
                            <h4>Own a Bar?</h4>
                        </div>
                    </NavLink>
                </div>
            <div id="below-intro">
                <Favorites sessionUser={userState} params={userId} />
            </div>
            </div>

        </>
    );
}
export default User;