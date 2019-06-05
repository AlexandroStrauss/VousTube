import {merge} from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_VIDEO, RECEIVE_ALL_VIDEOS } from '../actions/video_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, state, {[action.user.id]: action.user});
        case RECEIVE_VIDEO:
            
            return merge({}, state, {[action.author.id]: action.author });
        case RECEIVE_ALL_VIDEOS: 
            // debugger
            const newState = {};
            Object.values(action.authors).forEach(author => {
                newState[author.id] = author;
            })
            return merge({}, state, newState);
        default: 
            return state;
    }
}