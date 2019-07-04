import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session_actions";
// import { RECEIVE_ERRORS } from "../actions/video_actions";

const defaultSession = Object.freeze({
    id: null,
});

export default (state = defaultSession, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            const newState = {id: action.user.id};
            return Object.assign({}, newState);
        case LOGOUT_CURRENT_USER:
            const nullState = {id: null};
            return Object.assign({}, nullState);
        // case RECEIVE_ERRORS:
        //     return state;
        default: 
            return state;
    }
}
 
