import {SIGNIN_USER_REQUEST,SIGNIN_USER_FAILURE,SIGNIN_USER_SUCCESS} from "../actions/user.actions";

let initialState = {
  loading:false,
  error:null,
  user:null,
  currentUser:null
};

export default function(state = initialState, action) {
  switch(action.type){
    case SIGNIN_USER_REQUEST:
      return{...state,loading:action.loading,user:null};
    case SIGNIN_USER_SUCCESS:
      return{...state,loading:action.loading,user:action.user};
    case SIGNIN_USER_FAILURE:
      return{...state,loading:action.loading,error:action.error};
    default:
      return state;
  }

}
