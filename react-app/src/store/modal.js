const LOGIN = '/modal/login'
const SIGNUP = '/modal/login'

export const setLoginModal = (bool) => ({
    type: LOGIN,
    payload: { login: bool }
});

export const setSignupModal = (bool) => ({
    type: SIGNUP,
    payload: { signup: bool }
});



const initialState = { login: false, signup: false };

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOGIN:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case SIGNUP:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        default:
            return state;
    }
}

export default reducer;
