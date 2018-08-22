import {REQUEST_UPCOMING,REQUEST_UPCOMING_FAILURE,REQUEST_UPCOMING_SUCCESS,CREATE_EVENT_FAILURE,CREATE_EVENT_SUCCESS,CREATE_EVENT_REQUEST} from "../actions/upevent.actions";
let initialState = {
  loading:true,
  upcomingList:[],
  error:null,
  event:null
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
    case CREATE_EVENT_REQUEST:
      return {
        ...state,
        loading: action.loading,
        event:null
      };
    case CREATE_EVENT_SUCCESS:
      return{
        ...state,
        loading:action.loading,
        event:action.event
      };
    case CREATE_EVENT_FAILURE:
      return{
        ...state,
        loading:action.loading,
        error:action.error
      };
    default:
      return state
  }
}
