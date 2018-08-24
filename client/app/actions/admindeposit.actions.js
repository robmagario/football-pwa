
export const REQUEST_DEPOSITS='REQUEST_DEPOSITS';
export const REQUEST_DEPOSITS_SUCCESS='REQUEST_DEPOSITS_SUCCESS';
export const REQUEST_DEPOSITS_FAILURE='REQUEST_DEPOSITS_FAILURE';

export const requestDeposits=()=>{
  return{
    type:REQUEST_DEPOSITS,
    loading:true,
    error:null
  }
};
export const requestDepositsSuccess=(depositList)=>{
  return{
    type:REQUEST_DEPOSITS_SUCCESS,
    loading:false,
    error:null,
    depositList
  }
};
export const requestDepositsError=(error)=>{
  return{
    type:REQUEST_DEPOSITS_FAILURE,
    loading:false,
    depositList:[],
    error
  }
};
export const getDeposits=()=>{
  return function(dispatch){
    dispatch(requestDeposits());
    return fetch('/api/deposit/getdepositrequests')
      .then(res=>res.json(),error=>console.log(error))
      .then(json=>dispatch(requestDepositsSuccess(json.depositList))).catch(error=>{
        dispatch(requestDepositsError(error))
      });
  }
};

