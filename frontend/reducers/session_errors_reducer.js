
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from "../actions/session_actions";


export default (errors = {}, action) => {
    Object.freeze(errors);
    switch(action.type) {
        case RECEIVE_CURRENT_USER: 
            return {};
        case RECEIVE_ERRORS: 
            return Object.assign({}, action.errors);
        default:
            return errors;
    }
}
