const SET_USER_FAVORITES = 'userFavorites/setUserFavorites';
const ADD_FAVORITE = "add/addUserFavorites"
const DELETE_FAVORITE = "delete/deleteUserFavorites"

const setUserFavorites = (userFavorites) => ({
  type: SET_USER_FAVORITES,
  userFavorites
})


export const fetchUserFavorites = (userId) => {
  return async(dispatch) => {
    const response = await fetch(`/api/users/${userId}/favorites`)
    const data = await response.json()
    dispatch(
      setUserFavorites(data.favorites)
    )
  }
}

// const addUserFavoritesAC = (payload) => ({
//   type: ADD_FAVORITE,
//   payload
// })



export const addFavorite = (barId, userId) => {
  return async (dispatch) => {
  
    let response = await fetch(`/api/users/${userId}/favorites/${barId}/add`, {
      
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({barId, userId})
    })
    // response = await response.json()
    // dispatch(
    //   addUserFavoritesAC(response.favorite))
    }
  }



  const deleteUserFavoriteAC = (payload) => ({
    type: DELETE_FAVORITE,
    payload
  })

export const deleteFavorite = (barId, userId) => {
  return async (dispatch) => {
    // debugger
    let response = await fetch(`/api/users/${userId}/favorites/${barId}/delete`, {

      method: "DELETE",
      header: {
        "Content-Type": "applicaion.json"
      },
      body: JSON.stringify({barId, userId})
    })
    response = await response.json()
    // debugger
    dispatch(deleteUserFavoriteAC(response))
  }
}


const initialState = [];

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER_FAVORITES:
      newState = action.userFavorites
      return newState
    case ADD_FAVORITE:
  
      // newState = Object.assign({}, state)
      // newState.userFavorites.push(action.payload.favorite) //what is sapposed to be in place of User
      // return newState
    case DELETE_FAVORITE:
      newState = state.filter((fav) => {
        const ret = fav.id !== Number(action.payload.targetId)
        // debugger: for debugger
        return ret
      })
      return newState
    default:
      return state;
  }
}

export default reducer;