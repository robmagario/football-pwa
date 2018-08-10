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
    return fetch("/api/event/getevents")
      .then(
        res=>res.json(),
        error=>console.log("Error",error),
      )
      .then(json=>
      dispatch(requestUpcomingSuccess(json.eventList))
      ).catch(error=>{
        console.error(error);
        dispatch(requestUpcomingError(error))
      })
  }
}
