const SEARCH = '/bars/search'
const CLEAR_SEARCH = '/bars/clearSearch'
const POPULAR = '/bars/popular'
const BARDATA = '/bars/bardata';

const search = (businesses) => ({
    type: SEARCH,
    payload: businesses
});

const popular = (businesses) => ({
    type: POPULAR,
    payload: businesses
});
const bardata = (business) => ({
    type: BARDATA,
    payload: business
})

export const clearSearchInfo = () => ({
    type: CLEAR_SEARCH
});

export const homeDisplayBussinesses = () => async (dispatch) => {
    let res = await fetch("/api/search/popular",{
        headers: {
          'Content-Type': 'application/json'
        }
      });
    res = await res.json()
    dispatch(popular(res))
};



export const searchBusinesses = (url, location, id, time, day, date) => async (dispatch) => {
    let coordString = 'NoLocation'
    const tt = window.tt

    if (location) {
          let loc = await tt.services.fuzzySearch({
            key: 'g0ZS3ih3olA15iG2cSglfY1YrEJO8DKR',
            query: location
          }).go()
        coordString = `${loc.results[0].position.lng},${loc.results[0].position.lat}`
        //defaulting to new york
        // coordString = '-73.93,40.73'
    }

    let res = await fetch(url + `&coord=${coordString}&id=${id}`,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
    res = await res.json()
    dispatch(search(res))
};

export const barDataDisplay = (barId) => async (dispatch) => {
    let res = await fetch(`/api/bars/${barId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    res = await res.json();
    dispatch(bardata(res));
};

const initialState = { barInfo: null };

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CLEAR_SEARCH:
            newState = Object.assign({}, state);
            newState.searchResults = null;
            newState.searchCenter = null;
            return newState;
        case SEARCH:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case POPULAR:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case BARDATA:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        default:
            return state;
    }
}

export default reducer;
