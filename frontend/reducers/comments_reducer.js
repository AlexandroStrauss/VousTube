import { merge } from 'lodash';
import { RECEIVE_VIDEO, RECEIVE_COMMENT } from '../actions/video_actions';
import { RECEIVE_LIKE } from '../actions/like_actions';

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_COMMENT:
            const {comment} = action;
            const parentComment = state[comment.parent_comment_id]
            if (parentComment) {
                parentComment.child_comments.push(comment)
            }
            return merge({}, state, { [comment.id]: comment})
        case RECEIVE_VIDEO:
            return merge({}, state, action.comments)
        default:
            return state;
    }
}

export default commentsReducer;
