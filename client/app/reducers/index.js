import {combineReducers} from 'redux';
import upcomingevents from "./upevents.reducers";
import user from "./user.reducers"

const rootReducer = combineReducers({upcomingevents,user});

export default rootReducer;
