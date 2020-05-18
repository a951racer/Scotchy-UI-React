import { REQUEST_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../actionTypes/auth";

const initialState = {
  userStatus: 'loggedOut'
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN: {
      return { userStatus: 'loggingIn' }
    }
    case LOGIN_SUCCESS: {
      return { userStatus: 'loggedIn' }  // plus user attributes, token etc. from action.payload
    }
    case LOGIN_FAIL: {
      return { userStatus: 'loggedOut' }
    }
    default:
      return state;
  }
}

export default auth