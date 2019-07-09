import { merge } from 'lodash';
import {RECEIVE_LIKE, RECEIVE_LIKES } from '../actions/like_actions';
import { RECEIVE_VIDEO, RECEIVE_COMMENT } from '../actions/video_actions';


const likesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_LIKE:
            return merge({}, state, action.value, action.likeable_id, action.likeable_type)
        case RECEIVE_LIKES: 
            return merge({}, state, action.likes)
        case RECEIVE_VIDEO:
            return merge({}, state, action.likes)
        case RECEIVE_COMMENT:
            return merge({}, state, action.likes)
        default:
            return state;
    }
}

export default likesReducer;