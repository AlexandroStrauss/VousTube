import { merge } from 'lodash';
import { RECEIVE_VIDEO, RECEIVE_ALL_VIDEOS, RECEIVE_COMMENT } from '../actions/video_actions';

// const defaultVideo = {
//         id: null,
//         title: null,
//         description: "",
// }

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_VIDEOS:
            const newState = {};
            Object.values(action.videos).forEach(video => {
                newState[video.id] = video;
            })
            return merge({}, state, newState);
        case RECEIVE_VIDEO:
            return merge({}, state, {[action.video.id]: action.video});
        case RECEIVE_COMMENT: 
            const comment = action.comment;
            const anotherNewState = merge({}, state);
            anotherNewState[comment.video_id].commentIds.push(comment.id);
            return anotherNewState;
        default:
            return state;
    }
}
