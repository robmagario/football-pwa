export const REQUEST_UPCOMING='REQUEST_UPCOMING';
export const REQUEST_UPCOMING_SUCCESS='REQUEST_UPCOMING_SUCCESS';
export const REQUEST_UPCOMING_FAILURE='REQUEST_UPCOMING_FAILURE';

export const requestUpcoming =()=>{
  return{
    type:REQUEST_UPCOMING,
    loading:true,
    error:null
  }
};
export const requestUpcomingSuccess=(upcomingList)=>{
  return{
    type:REQUEST_UPCOMING_SUCCESS,
    loading:false,
    error:null,
    upcomingList

  }
};
export const requestUpcomingError=(error)=>{
  return{
    type:REQUEST_UPCOMING_FAILURE,
    loading:false,
    upcomingList:[],
    error
  }
};
export function getUpcoming(){
  return function(dispatch){
    dispatch(requestUpcoming());
    return fetch("https://cors-anywhere.herokuapp.com/https://api.betsapi.com/v2/events/upcoming?sport_id=1&token=8984-1OAGIlKV4MjR92&league_id=155")
      .then(
        res=>res.json(),
        error=>console.log("Error",error),
      )
      .then(json=>
      dispatch(requestUpcomingSuccess(json.results))
      ).catch(error=>{
        console.error(error);
        dispatch(requestUpcomingError(error))
      })
  }
}
