import axios from "axios";
import {
  RESULTS_LOADED,
  ERROR_LOADED,
  CURRENT_EVENT,
  TEXT_SEARCH,
  DATE_SEARCH
} from "./type";

const API_URL = "https://opendata.paris.fr";

export const initialSearch = name => dispatch => {
  axios
    .get(API_URL + "/api/records/1.0/search/?dataset=que-faire-a-paris-&q=")
    //success
    .then(async newData =>
      dispatch(setResults({ bool: true, array: await newData.data.records }))
    )
    //fail
    .catch(error => dispatch(setError(error)));
};

export const searchByName = (name, date) => dispatch => {
  axios
    .get(
      API_URL +
        "/api/records/1.0/search/?dataset=que-faire-a-paris-&q=" +
        name +
        "&facet=date_start&refine.date_start=" +
        date
    )
    //success
    .then(async newData => {
      if(newData.data.records.length === 0) {
        dispatch(setError("Aucun resultat"))
      } else {
        dispatch(setError(null))
      }
      dispatch(setResults({ bool: true, array: await newData.data.records }));
    })
    //fail
    .catch(error => dispatch(setError(error)));
};

// Pas encore fonctionnel
export const searchByDate = date => dispatch => {
  axios
    .get(
      API_URL +
        "/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=date_start&refine.date_start=" +
        date
    )
    // Success
    .then(async newData =>
      dispatch(setResults({ bool: true, array: await newData.data.records }))
    )
    // FAIL
    .catch(error => dispatch(setError(error)));
};

export const setResults = res => {
  return {
    type: RESULTS_LOADED,
    value: res
  };
};

export const setError = value => {
  return {
    type: ERROR_LOADED,
    value: value
  };
};

export const setCurrentEvent = (item, isEvent) => {
  return {
    type: CURRENT_EVENT,
    payload: { item, isEvent }
  };
};

export const setTextSearch = value => {
  return {
    type: TEXT_SEARCH,
    payload: value
  };
};

export const setDateSearch = value => {
  return {
    type: DATE_SEARCH,
    payload: value
  };
};
