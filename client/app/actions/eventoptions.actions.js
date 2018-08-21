export const REQUEST_OPTIONS='REQUEST_OPTIONS';
export const REQUEST_OPTIONS_SUCCESS='REQUEST_OPTIONS_SUCCESS';
export const REQUEST_OPTIONS_FAILURE='REQUEST_OPTIONS_FAILURE';

export const requestOptions =()=>{
  return{
    type:REQUEST_OPTIONS,
    loading:true,
    error:null
  }
};
export const requestOptionsSuccess=(optionsList)=>{
  return{
    type:REQUEST_OPTIONS_SUCCESS,
    loading:false,
    error:null,
    optionsList

  }
};
export const requestOptionsError=(error)=>{
  return{
    type:REQUEST_OPTIONS_FAILURE,
    loading:false,
    optionsList:[],
    error
  }
};
export function getOptions(eventcode){
  return function(dispatch){
    dispatch(requestOptions());
    return fetch("/api/event/getoptions?eventslug="+eventcode)
      .then(
        res=>res.json(),
        error=>console.log("Error",error),
      )
      .then(json=>
        dispatch(requestOptionsSuccess(json.optionsList))
      ).catch(error=>{
        console.error(error);
        dispatch(requestOptionsError(error))
      })
  }
}
