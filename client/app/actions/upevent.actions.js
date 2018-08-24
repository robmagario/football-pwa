
export const REQUEST_UPCOMING='REQUEST_UPCOMING';
export const REQUEST_UPCOMING_SUCCESS='REQUEST_UPCOMING_SUCCESS';
export const REQUEST_UPCOMING_FAILURE='REQUEST_UPCOMING_FAILURE';

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const createEventRequest=()=>{
  return{
    type:CREATE_EVENT_REQUEST,
    loading:true,
    error:null
  }
};
export const createEventSuccess=(event)=>{
  return{
    type:CREATE_EVENT_SUCCESS,
    loading:true,
    error:null,
    event
  }
};
export function createEventFailure(error) {
  return {
    type: CREATE_EVENT_FAILURE,
    loading:false,
    event:null,
    error
  };
}
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

export function createEvent(values){
  return function(dispatch){
    dispatch(createEventRequest());
    return fetch('/api/create/createevent?name='+values.name+'&category='+values.category+'&amount='+values.amount,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      }
    })
      .then(res=>res.json(), error=>console.log('Error',error))
      .then(json=>dispatch(createEventSuccess(json.event))).catch(error=>{
        console.log(error);
        dispatch(createEventFailure(error));
      })
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
