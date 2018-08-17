import axios from 'axios';

export const SIGNIN_USER_REQUEST = 'SIGNIN_USER_REQUEST';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

export function signInUserRequest() {
  return {
    type: SIGNIN_USER_REQUEST,
    error:null,
    loading:true
  };
}

export function signInUserSuccess(user) {
  return {
    type: SIGNIN_USER_SUCCESS,
    loading:false,
    error:null,
    user
  };
}

export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    loading:false,
    user:null,
    error
  };
}
export function signInUser(values){
  return function(dispatch){
    dispatch(signInUserRequest());
    return fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.signInEmail,
        password: values.signInPassword
      }),}).then(res=>res.json(),error=>console.log("Error",error))
      .then(json=>dispatch(signInUserSuccess(json.user))).catch(error=>{
        console.error(error);
        dispatch(signInUserFailure(error))
      })
  }
}
