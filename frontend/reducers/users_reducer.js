import {merge} from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_VIDEO, RECEIVE_ALL_VIDEOS } from '../actions/video_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, state, {[action.user.id]: action.user});
        case RECEIVE_VIDEO:
            const nouvelleEtat = {}
            debugger
            Object.values(action.commentAuthors).forEach(author => {
                nouvelleEtat[author.id] = author;
            })
            debugger

            return merge({}, state, nouvelleEtat, {[action.author.id]: action.author });
        case RECEIVE_ALL_VIDEOS: 
            const newState = {};
            Object.values(action.authors).forEach(author => {
                newState[author.id] = author;
            })
            return merge({}, state, newState);
        default: 
            return state;
    }
}