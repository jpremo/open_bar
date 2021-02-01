const RESERVATIONS = '/bars/reservations'
const CLEAR = '/bars/clear'

const reservations = (reserves) => ({
    type: RESERVATIONS,
    payload: reserves
})

export const clearInfo = () => ({
    type: CLEAR
});

export const getReservations = (barId, userId) => async (dispatch) => {
    let res = await fetch(`/api/bars/${barId}/reservations/user/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    res = await res.json();
    dispatch(reservations(res));
}

const initialState = { };

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CLEAR:
            newState = Object.assign(state);
            return newState;
        case RESERVATIONS:
            newState = Object.assign(state, { ...action.payload });
            return newState;
        default:
            return state;
    }
}

export default reducer;
