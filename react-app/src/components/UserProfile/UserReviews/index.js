import React, { useState, useEffect } from "react";
import Review from "../../Bar/Reviews/Review/Review.js";
import ReviewClone from "./ReviewClone"
import "./index.css";

const UserReviews = ({reviews, user}) => {



    return (
        <div id="user-reviews-container">
            {reviews && <p>{user.firstName} has {reviews.length} reviews</p>}
            {/* {reviews && reviews.map(review => { return <Review key={review.id} props={review} /> }) } */}
            {reviews && reviews.map(review => { return <ReviewClone key={review.id} props={review} /> }) }

        </div>
    );
};

export default UserReviews