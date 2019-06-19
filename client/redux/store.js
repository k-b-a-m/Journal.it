import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import { PathActions } from 'three';

//initialState
const initialState = {
  entries: [],
  user: {},
}

//ACTION TYPES

const SET_ENTRIES = 'SET_ENTRIES';
const ADD_ENTRY = 'ADD_ENTRY`';
const UPDATE_ENTRY = 'UPDATE_ENTRY';
const SET_HEATMAP = 'SET_HEATMAP';
const GET_USER = 'GET_USER';
const SET_GOOGKEY = "SET_GOOGKEY";

//ACTION CREATORS

const setEntries = entries => ({
  type: SET_ENTRIES,
  entries
});

const setGoogKey = key => ({
  type: SET_GOOGKEY,
  key
});

const getUser = user => ({
  type: GET_USER,
  user,
});

export const fetchUser = (fbUserId) => {
  return dispatch => {
    return axios.get(`/user/${fbUserId}`)
      .then(res => dispatch(getUser(res.data)))
      .catch(e => console.log(`Error fetching user:\n${e}`));
  };
};

export const getOrCreateUser = (fbUserId, fbUser) => {
  return dispatch => {
    console.log(`thunk getOrCreate:`, fbUser);
    return axios.post(`/user/getOrCreate/${fbUserId}`, fbUser)
      .then(res => dispatch(getUser(res.data)))
      .catch(e => console.log(`Error fetching or creating user:\n${e}`));
  }
}

export const addEntry = entry => ({
  type: ADD_ENTRY,
  entry
});

const updateEntry = entry => ({
  type: UPDATE_ENTRY,
  entry
});

const setHeatMap = entries => ({
  type: SET_HEATMAP,
  entries
});

//THUNK CREATORS

// export const fetchEntries = () => async dispatch => {
//   try {
//     const response = await axios.get("/entries");
//     const entries = response.data;
//     return dispatch(setEnstries(entries));
//   } catch (err) {
//     throw new Error(err);
//   }
// };

export const fetchGoogKey = key => {
  return dispatch => {
    return axios
      .get("/googlemaps")
      .then(response => dispatch(setGoogKey(response.data)));
  };
};

export const addEntryThunk = entry => {
  return dispatch => {
    return axios
      .post(`/entries`, entry)
      .then(entry => dispatch(addEntry(entry.data)))
      .catch(err => {
        throw new Error(err);
      });
  };
};

export const updateEntryThunk = entry => {
  return dispatch => {
    return axios
      .put(`entries/${entry.id}`, entry)
      .then(entry => dispatch(updateEntry(entry.data)))
      .catch(err => {
        throw new Error(err);
      });
  };
};

export const fetchNearby = obj => async dispatch => {
  const { coordinate, distance } = obj;
  try {
    const resp = await axios.post("/entries/nearby", { coordinate, distance });

    const entries = resp.data;
    return dispatch(setEntries(entries));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateHeatMap = coords => async dispatch => {
  const { min, max } = coords;
  console.log(min);
  console.log(max);
  try {
    const resp = await axios.post("/entries/mapmarkers", coords);
    const entries = resp.data;
    return dispatch(setHeatMap(entries));
  } catch (err) {
    throw new Error(err);
  }
};

//REDUCER

const entriesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ENTRIES:
      return [...state, ...action.entries];
    case ADD_ENTRY:
      return [...state, action.entry];
    case UPDATE_ENTRY:
      return [
        ...state.filter(entry => entry.id !== action.entry.id),
        action.entry
      ];
    default:
      return state;
  }
};

const heatmapReducer = (state = [], action) => {
  switch (action.type) {
    case SET_HEATMAP:
      return [...action.entries];
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
const googKeyReducer = (state = "", action) => {
  switch (action.type) {
    case SET_GOOGKEY:
      return action.key;
    default:
      return state
  }
};

const rootReducer = combineReducers({
  entries: entriesReducer,
  heatmap: heatmapReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
