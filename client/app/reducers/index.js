import {combineReducers} from 'redux';
import upcomingevents from "./upevents.reducers";
import eventodds from "./odds.reducers";

const rootReducer = combineReducers({upcomingevents,eventodds});

export default rootReducer;
