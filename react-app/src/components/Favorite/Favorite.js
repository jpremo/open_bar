import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFavorite, deleteFavorite, fetchUserFavorites } from "../../store/favorites"

function Favorite ({barId, user}) {

  let [favoriteBar, setFavoriteBar] = useState(false);
  const dispatch = useDispatch();
  
  const handleFavoriteSubmit = async(e) => {
      e.preventDefault();

      if (user.id === null) {
        alert('Please Login or Signup to favorite a bar.')
      } else {
        dispatch(addFavorite(parseInt(barId), parseInt(user.id)))
        alert('Thank you for favoriting!')
      }
  }


  //   useEffect( () => {
  //   (async () => {
  //     await dispatch(clear())
  //     await dispatch(barDataDisplay(barId))
  //   })();
  // }, [dispatch, barId])


  const handleUnfavoriteSubmit = async(e) => {
      e.preventDefault();

      dispatch(deleteFavorite(parseInt(barId), parseInt(user.id)))
      alert('You have unfavorited this bar.')
  }

  let session = useSelector(state => state.session)

  useEffect( () => {
    if (user.id !== null) {
      if (session.user !== null) {
        const bars = session.user.favoriteBars;
        const numOfBars = bars.length;
        let i = 0;
        while (i < numOfBars) {
          if (bars[i].id === parseInt(barId)) {
            setFavoriteBar(true);
            break;
          }
          i++;
        }
      }

    }
  }, [dispatch, favoriteBar, setFavoriteBar])

  return (
    <>
      <div id='favorite-div'>
        { (favoriteBar === true) ? <h3>This Bar Is One of Your Favorites!</h3> : <h3>Add To Your Favorites</h3> }
        { (favoriteBar === true) ? <button id='favorite-me-button' onClick={handleUnfavoriteSubmit}>Unfavorite Me!</button> : <button id='favorite-me-button' onClick={handleFavoriteSubmit}>Favorite Me!</button>}
      </div>
    </>
  );
}

export default Favorite;