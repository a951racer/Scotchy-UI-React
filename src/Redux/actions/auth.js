import { REQUEST_LOGIN, LOGIN_SUCCESS } from '../actionTypes/auth'

export const requestLogin = () => {
  console.log("action: request login")
  return {
    type: REQUEST_LOGIN
  }
}

export const loginSuccess = () => {
  console.log("action: login success")
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
  console.log("action: onLoginSubmit")
  dispatch(requestLogin())
  // call API to authenticate
  dispatch(loginSuccess()) // pretend api call succeeded
}
  