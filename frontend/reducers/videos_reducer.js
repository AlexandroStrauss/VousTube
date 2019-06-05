import { merge } from 'lodash';
import { RECEIVE_VIDEO, RECEIVE_ALL_VIDEOS } from '../actions/video_actions';

// const defaultVideo = {
//         id: null,
//         title: null,
//         description: "",
// }

export default (state = {}, action) => {
    // debugger
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_VIDEOS:
            // debugger
            const newState = {};
            Object.values(action.videos).forEach(video => {
                newState[video.id] = video;
            })
            return merge({}, state, newState);
        case RECEIVE_VIDEO:
            return merge({}, state, {[action.video.id]: action.video});
        default:
            return state;
    }
}
