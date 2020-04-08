import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER_LOGOUT, CLEAR_SESSION_ERRORS } from '../actions/session_actions';


const sessionErrorsReducer = (state= [], action) => {
    Object.freeze(state);
    switch(action.type) {
        case CLEAR_SESSION_ERRORS:
            return {};
        case RECEIVE_SESSION_ERRORS:
            return action.errors;

        case RECEIVE_CURRENT_USER:
            return {};

        case RECEIVE_USER_LOGOUT:
            return {}; 
        
        default:
            return state;
    }
};

export default sessionErrorsReducer;