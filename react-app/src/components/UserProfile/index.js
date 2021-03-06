import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModal, setCreateBarModal } from "../../store/modal"
import PhotoUpload from "../PhotoUpload/PhotoUpload.js"
import Favorites from "./Favorites"
import UserReviews from "./UserReviews"

import "./index.css"




function User() {

    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState({})
    const [profilePic, setProfilePic] = useState("")


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

    let isUserProfile

    if (userId === sessId) {
        isUserProfile = "a thing"
    }

    if (!user) {
        return null;
    }


    const handleCreateBarModal = async (e) => {
        e.preventDefault();

        if (user.id === null) {
            dispatch(setLoginModal(true))
        } else {
            dispatch(setCreateBarModal(true))
            // alert('Thank you for favoriting!')
        }
    }

    if (!user) return null

    return (
        <>
            <div id="user-profile-container">
                <div id='user-intro-wrapper'>
                    <div id="img-box">
                        <PhotoUpload defaultValue={user.profileImg} setter={setProfilePic} profilePage={true} />
                    </div>
                    <div id="user-intro">
                        <div id="user-info-box">
                            <div id="user-info-text">
                                <h3>{`${user.firstName} ${user.lastName}`}</h3>
                                <h5>{`Username: ${user.username}`}</h5>
                            </div>
                        </div>

                        <button id="create-bar-button" onClick={handleCreateBarModal}>
                            <h4>Own a Bar?</h4>
                        </button>

                    </div>
                </div>
                <Favorites sessionUser={userState} params={userId} />
                {reviews && <UserReviews reviews={reviews.reviews} user={user} />}
            </div>

        </>
    );
}
export default User;
