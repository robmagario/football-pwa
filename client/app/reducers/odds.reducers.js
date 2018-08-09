import {REQUEST_ODDS,REQUEST_ODDS_SUCCESS} from "../actions/odds.actions";

let initialState={
  odds:null
};
export default(state=initialState,action)=>{
  switch(action.type){
    case REQUEST_ODDS:
      return {
        ...state,

      };
    case REQUEST_ODDS_SUCCESS:
      return{
        ...state,
        odds:action.odds
      };
    default:
      return state
  }
}
