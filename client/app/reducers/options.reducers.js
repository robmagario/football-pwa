import {REQUEST_OPTIONS,REQUEST_OPTIONS_FAILURE,REQUEST_OPTIONS_SUCCESS} from "../actions/eventoptions.actions";
let initialState = {
  loading:false,
  optionsList:[],
  error:null
};

export default(state=initialState,action)=>{
  switch(action.type){
    case REQUEST_OPTIONS:
      return {
        ...state,
        loading: action.loading,
        optionsList: []
      };
    case REQUEST_OPTIONS_SUCCESS:
      return{
        ...state,
        loading:action.loading,
        optionsList:action.optionsList
      };
    case REQUEST_OPTIONS_FAILURE:
      return{
        ...state,
        loading:action.loading,
        error:action.error
      };
    default:
      return state
  }
}
