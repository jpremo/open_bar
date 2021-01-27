const SET_USER_FAVORITES = 'userFavorites/setUserFavorites';

const setUserFavorites = (userFavorites) => ({
  type: SET_USER_FAVORITES,
  userFavorites
})


export const fetchUserFavorites = (userId) => {
  return async(dispatch) => {
    const response = await fetch(`/api/users/${userId}/favorites`)
    const data = await response.json()
    console.log(data)
    dispatch(
      setUserFavorites(data.favorites)
    )
  }
}



const initialState = [];

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER_FAVORITES:
      newState = Object.assign({}, state)
      return newState
    default:
      return state;
  }
}

export default reducer;