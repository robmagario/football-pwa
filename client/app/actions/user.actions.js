export const SIGNIN_USER_REQUEST = 'SIGNIN_USER_REQUEST';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';


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
    message:"You are signed in!",
    user
  };
}

export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    loading:false,
    message:"Authentication Error",
    user:null,
    error
  };
}
export function verifyUserRequest(){
  return{
    type:ME_FROM_TOKEN,
    loading:true,
    error:null
  }
}
export function verifyUserSuccess(currentUser){
  return{
    type:ME_FROM_TOKEN_SUCCESS,
    loading:false,
    error:null,
    currentUser
  }
}
export function verifyUserFailure(error){
  return{
    type:ME_FROM_TOKEN_FAILURE,
    loading:false,
    currentUser:null,
    error

  }
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
      .then(json=>{sessionStorage.setItem('jwtToken',json.token);dispatch(signInUserSuccess(json.user));window.location.reload()}).catch(error=>{
        console.error(error);
        dispatch(signInUserFailure(error))
      })
  }
}
export function verifyUser(tokenFromStorage){
  return function (dispatch){
    dispatch(verifyUserRequest());
    return fetch('/api/account/verify?token='+tokenFromStorage,{
      method:'GET',
      headers:{
        'Authorization': 'Bearer ${tokenFromStorage}'
      }
    })
      .then(res=>res.json(),error=>console.log('Error',error))
      .then(json=>dispatch(verifyUserSuccess(json.user))).catch(error=>{
        console.log(tokenFromStorage);
        console.log(error);
        dispatch(verifyUserFailure(error));
      })
  }
}
