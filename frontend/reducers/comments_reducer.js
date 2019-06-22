import { merge } from 'lodash';
import { RECEIVE_VIDEO, RECEIVE_COMMENT } from '../actions/video_actions';

const commentsReducer = (state = {}, action) => {
    // debugger
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_COMMENT:
            // debugger
            const {comment} = action;
            return merge({}, state, { [comment.id]: comment})
        case RECEIVE_VIDEO:
            // debugger
            return merge({}, state, action.comments)
        default:
            return state;
    }
}

export default commentsReducer;
