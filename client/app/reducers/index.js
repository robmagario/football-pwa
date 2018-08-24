import {combineReducers} from 'redux';
import upcomingevents from "./upevents.reducers";
import user from "./user.reducers";
import options from "./options.reducers"
import verify from "./verify.reducer"
import deposits from "./admindeposit.reducers"

const rootReducer = combineReducers({upcomingevents,user,verify,options,deposits});

export default rootReducer;
