import {authenticate} from '../services/auth'

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const removeUser = () => ({
  type: REMOVE_USER
});

export const restoreUser = () => async (dispatch) => {
    debugger
    const res = await authenticate();
    console.log(res)
    dispatch(setUser(res));
    return res;
  };

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  debugger
  console.log('action', action)
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
