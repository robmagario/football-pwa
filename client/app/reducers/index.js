import {combineReducers} from 'redux';
import upcomingevents from "./upevents.reducers";
import user from "./user.reducers";
import verify from "./verify.reducer"

const rootReducer = combineReducers({upcomingevents,user,verify});

export default rootReducer;
