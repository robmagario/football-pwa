export const REQUEST_USER_DEPOSITS='REQUEST_USER_DEPOSITS';
export const REQUEST_USER_DEPOSITS_SUCCESS='REQUEST_USER_DEPOSITS_SUCCESS';
export const REQUEST_USER_DEPOSITS_FAILURE='REQUEST_USER_DEPOSITS_FAILURE';

export const requestUserDeposits=()=>{
  return{
    type:REQUEST_USER_DEPOSITS,
    loading:true,
    error:null
  }
};
export const requestUserDepositsSuccess=(userDepositList)=>{
  return{
    type:REQUEST_USER_DEPOSITS_SUCCESS,
    loading:false,
    error:null,
    userDepositList
  }
};
export const requestUserDepositsError=(error)=>{
  return{
    type:REQUEST_USER_DEPOSITS_FAILURE,
    loading:false,
    userDepositList:[],
    error
  }
};
export const getUserDeposits=(userID)=>{
  return function(dispatch){
    dispatch(requestUserDeposits());
    return fetch('/api/deposit/getuserdepositrequests?userID='+userID)
      .then(res=>res.json(),error=>console.log(error))
      .then(json=>dispatch(requestUserDepositsSuccess(json.userDepositList))).catch(error=>{
        dispatch(requestUserDepositsError(error))
      });
  }
};

