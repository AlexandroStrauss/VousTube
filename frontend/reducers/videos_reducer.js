import { merge } from 'lodash';
import { RECEIVE_VIDEO, RECEIVE_ALL_VIDEOS } from '../actions/video_actions';

const defaultVideo = {
        id: null,
        title: null,
        description: "",
}


export default (state = defaultVideo, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_VIDEOS:

        case RECEIVE_VIDEO:

        default:
            return state;
    }
}
