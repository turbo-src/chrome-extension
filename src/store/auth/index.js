import axios from 'axios';

//Action Types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SETAUTH = 'SETAUTH';

//Action Creators
const loginUser = data => {
  return { type: LOGIN, data: data };
};

export const logoutUser = () => {
  return { type: LOGOUT };
};

export const setAuth = data => {
  console.log('action creator', data);
  return { type: SETAUTH, data: data };
};

const initialState = { isLoggedIn: false, user: { ethereumAddress: 'none', ethereumKey: 'none' } };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SETAUTH: {
      let newState = { ...state, isLoggedIn: true, user: action.data };
      return newState;
    }
    case LOGOUT: {
      chrome.storage.local.remove(['turbosrcUser'], function() {
        var error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        }
      });
      return { isLoggedIn: false, user: { ethereumAddress: 'none', ethereumKey: 'none' } };
    }
    default:
      return state;
  }
}
