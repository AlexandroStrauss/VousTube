import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session_actions";

const defaultSession = {
    id: null,
};

export default (state = defaultSession, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            const newState = {id: action.user.id};
            return Object.assign({}, newState);
        case LOGOUT_CURRENT_USER:
            const nullState = {id: null};
            return Object.assign({}, nullState);
        default: 
            return state;
    }
}
 
