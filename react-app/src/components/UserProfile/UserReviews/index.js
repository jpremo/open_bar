import React, { useState, useEffect } from "react";
import ReviewClone from "./ReviewClone"
import "./index.css";

const UserReviews = ({reviews, user}) => {

    // const [bars, setBars] = useState({});

    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch(`/api/bars/getallbars`);
    //         const bars = await response.json();
    //         setBars(bars);
    //     })();
    // }, [])


    return (
        <div id="user-reviews-container">
            {reviews && <p>{user.firstName} has {reviews.length} reviews</p>}
            {/* {reviews && reviews.map(review => { return <Review key={review.id} props={review} /> }) } */}
            {reviews && reviews.map(review => { return <ReviewClone key={review.id} props={review} /> }) }

        </div>
    );
};

export default UserReviews