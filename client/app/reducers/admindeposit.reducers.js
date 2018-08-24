import {REQUEST_DEPOSITS,REQUEST_DEPOSITS_FAILURE,REQUEST_DEPOSITS_SUCCESS} from "../actions/admindeposit.actions";
let initialState = {
  loading:false,
  depositList:[],
  error:null
};

export default(state=initialState,action)=>{
  switch(action.type){
    case REQUEST_DEPOSITS:
      return {
        ...state,
        loading: action.loading,
        depositList: []
      };
    case REQUEST_DEPOSITS_SUCCESS:
      return{
        ...state,
        loading:action.loading,
        depositList:action.depositList
      };
    case REQUEST_DEPOSITS_FAILURE:
      return{
        ...state,
        loading:action.loading,
        error:action.error
      };
    default:
      return state
  }
}
