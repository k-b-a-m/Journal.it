import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

//ACTION TYPES

const SET_ENTRIES = "SET_ENTRIES";
const ADD_ENTRY = "ADD_ENTRY`";
const SET_HEATMAP = "SET_HEATMAP";

//ACTION CREATORS

const setEntries = entries => ({
  type: SET_ENTRIES,
  entries
});

const addEntry = entry => ({
  type: ADD_ENTRY,
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
//     return dispatch(setEntries(entries));
//   } catch (err) {
//     throw new Error(err);
//   }
// };

export const addEntryThunk = entry => {
  return dispatch => {
    return axios
      .post(`/entries`, entry)
      .then(entry => dispatch(addEntry(entry)))
      .catch(err => {
        throw new Error(err);
      });
  };
};

export const fetchNearby = obj => async dispatch => {
  const { coordinate, distance } = obj;
  console.log(coordinate);
  console.log(distance);
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

const entries = (state = [], action) => {
  switch (action.type) {
    case SET_ENTRIES:
      return [...action.entries];
    case ADD_ENTRY:
      return [...state, ...action.entry];
    default:
      return state;
  }
};

const heatmap = (state = [], action) => {
  switch (action.type) {
    case SET_HEATMAP:
      return [...action.entries];
    default:
      return state;
  }
};

const rootReducer = combineReducers(entries, heatmap);

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
