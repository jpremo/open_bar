import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css"

function User() {
    const [user, setUser] = useState({});
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
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <>
            <div id="user-profile-container">
                <div id="img-container">
                    <img alt="nope" src={user.profileImg} />
                </div>
                <div>
                    <h3>{`${user.firstName} ${user.lastName}`}</h3>
                    <h5>{`Username: ${user.username}`}</h5>
                </div>
            </div>

        </>
    );
}
export default User;