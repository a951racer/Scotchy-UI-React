import { REQUEST_LOGIN, LOGIN_SUCCESS } from '../actionTypes/auth'

export const requestLogin = () => {
  return {
    type: REQUEST_LOGIN
  }
}

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
    // USER ATTRIBUTES, TOKENS GO HERE
  }
}

/*
export const loginFail = () => {
  return {
    type: LOGIN_FAIL
  }
}
*/

export const onLoginSubmit = () => dispatch => {
  dispatch(requestLogin())
  // call API to authenticate
  dispatch(loginSuccess()) // pretend api call succeeded
}
  