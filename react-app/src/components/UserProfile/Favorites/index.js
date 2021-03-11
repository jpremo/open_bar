import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserFavorites, deleteFavorite } from "../../../store/favorites"
import BarBox from "../../Home/BarBox"
import "./index.css"


const FavoriteCards = ({ userFav, hidden, params }) => {

    const barId = userFav.id




    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(deleteFavorite(barId, params))
    }


    return (
        <>
            <div id="card">
                <button id="unfavorite-button" hidden={hidden}
                    onClick={handleSubmit}>unfavorite</button>
                {!userFav && <p>user does not have favorites yet</p>}
                {userFav && <BarBox bar={userFav} /> }
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
                <p>Favorite Bars</p>
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