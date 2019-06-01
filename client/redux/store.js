import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//ACTION TYPES

const SET_ENTRIES = 'SET_ENTRIES';

//ACTION CREATORS

const setEntries = entries => ({
  type: SET_ENTRIES,
  entries,
});

//THUNK CREATORS

export const fetchEntries = () => async dispatch => {
  try {
    const response = await axios.get('/entries');
    const entries = response.data;
    return dispatch(setEntries(entries));
  } catch (err) {
    throw new Error(err);
  }
};

export const addEntryThunk = entry => {
  return dispatch => {
    return axios
      .post(`/entries`, entry)
      .then(() => dispatch(fetchEntries()))
      .catch(err => {
        throw new Error(err);
      });
  };
};

//REDUCER

const entries = (state = [], action) => {
  switch (action.type) {
    case SET_ENTRIES:
      return action.entries;
    default:
      return state;
  }
};

const store = createStore(entries, applyMiddleware(thunkMiddleware));

export default store
