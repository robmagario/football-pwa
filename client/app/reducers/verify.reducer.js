import {ME_FROM_TOKEN,ME_FROM_TOKEN_FAILURE,ME_FROM_TOKEN_SUCCESS} from "../actions/user.actions";

let initialState = {
  loading:false,
  error:null,
  currentUser:null
};

export default function(state = initialState, action) {
  switch(action.type){
    case ME_FROM_TOKEN:
      return{...state,loading:action.loading,currentUser:null};
    case ME_FROM_TOKEN_SUCCESS:
      return{...state,loading:action.loading,currentUser:action.currentUser};
    case ME_FROM_TOKEN_FAILURE:
      return{...state,loading:action.loading,error:action.error};
    default:
      return state;
  }

}
