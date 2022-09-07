/*
    store안의 reducer들을 하나로 합쳐주는 곳
*/

import { combineReducers } from "redux";
//import user from './user_reducer';

// rootReducer : combineReducer를 이용하여 rootReducer에서 store안의 reducer들을 하나로 합쳐주는 것임
const rootReducer = combineReducers({
    //user, ...
})

export default rootReducer;