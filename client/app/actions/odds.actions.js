export const REQUEST_ODDS='REQUEST_ODDS';
export const REQUEST_ODDS_SUCCESS='REQUEST_ODDS_SUCCESS';

export const requestOdds =()=>{
  return{
    type:REQUEST_ODDS,
  }
};
export const requestOddsSuccess=(odds)=>{
  return{
    type:REQUEST_ODDS_SUCCESS,
    odds
  }
};

export function getOdds(eventID){
  return function(dispatch){
    dispatch(requestOdds());
    return fetch("https://cors-anywhere.herokuapp.com/https://api.betsapi.com/v1/event/odds?token=8984-1OAGIlKV4MjR92&odds_market=1_1&event_id="+eventID)
      .then(
        res=>res.json(),
        error=>console.log("Error",error),
      )
      .then(json=>
        dispatch(requestOddsSuccess(json.results["1_1"]["0"]))
      )
  }
}

