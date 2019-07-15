import { merge } from 'lodash';
import {RECEIVE_LIKE, RECEIVE_LIKES } from '../actions/like_actions';
import { RECEIVE_VIDEO, RECEIVE_COMMENT } from '../actions/video_actions';


const likesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_LIKE:
            debugger
            // const {like} = action.like


            return merge({}, state, { [action.like.id]: action.like })

        case RECEIVE_LIKES:
        debugger

            // const newState = {};
            // Object.values(action.likes).forEach(like => {
            //     newState[like.id] = like;
            // })
            // return merge({}, state, newState);

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