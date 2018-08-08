import {REQUEST_UPCOMING,REQUEST_UPCOMING_FAILURE,REQUEST_UPCOMING_SUCCESS} from "../actions/upevent.actions";
let initialState = {
  loading:true,
  upcomingList:[],
  error:null
};

export default(state=initialState,action)=>{
  switch(action.type){
    case REQUEST_UPCOMING:
      return {
        ...state,
        loading: action.loading,
        upcomingList: []
      };
    case REQUEST_UPCOMING_SUCCESS:
      return{
        ...state,
        loading:action.loading,
        upcomingList:action.upcomingList
      };
    case REQUEST_UPCOMING_FAILURE:
      return{
        ...state,
        loading:action.loading,
        error:action.error
      };
    default:
      return state
  }
}
