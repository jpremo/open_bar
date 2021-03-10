import React, { useState, useEffect } from "react";
import Review from "../../Bar/Reviews/Review/Review.js";
import "./index.css";

const UserReviews = ({reviews, user}) => {



    // {userReviews !== null ? userReviews.map(review => { return <Review key={review.id} props={review} /> }) : null }
    return (
        <div id="user-reviews-container">
            {reviews && <p>{user.firstName} has {reviews.length} reviews</p>}
            {reviews && reviews.map(review => { return <Review key={review.id} props={review} /> }) }
            {/* {reviews && reviews.map(review => { return <Review key={review.id} props={review} /> }) } */}

        </div>
    );
};

export default UserReviews