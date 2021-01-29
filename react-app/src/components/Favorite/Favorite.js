import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { addFavorite } from "../../store/favorites"

function Favorite ({barId, userId}) {

  const dispatch = useDispatch()
  
  const handleSubmit = async(e) => {
      e.preventDefault();
      dispatch(addFavorite(parseInt(barId), userId))
  }

  return (
    <div id='favorite-div'>
      <h3>Add To Your Favorites</h3>
      <button id='favorite-me-button' onClick={handleSubmit}>Favorite Me!</button>
    </div>
  );
}

export default Favorite;