import {REQUEST_USER_DEPOSITS,REQUEST_USER_DEPOSITS_FAILURE,REQUEST_USER_DEPOSITS_SUCCESS} from "../actions/userdeposit.actions";
let initialState = {
  loading:false,
  userDepositList:[],
  error:null
};

export default(state=initialState,action)=>{
  switch(action.type){
    case REQUEST_USER_DEPOSITS:
      return {
        ...state,
        loading: action.loading,
        userDepositList: []
      };
    case REQUEST_USER_DEPOSITS_SUCCESS:
      return{
        ...state,
        loading:action.loading,
        userDepositList:action.userDepositList
      };
    case REQUEST_USER_DEPOSITS_FAILURE:
      return{
        ...state,
        loading:action.loading,
        error:action.error
      };
    default:
      return state
  }
}
