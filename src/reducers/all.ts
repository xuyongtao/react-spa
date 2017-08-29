import { combineReducers } from "redux";


function userReducer(state = {}, action: any) {
    switch (action.type) {
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: userReducer
});

export default rootReducer;
