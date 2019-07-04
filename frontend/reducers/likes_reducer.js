import { merge } from 'lodash';
import { RECEIVE_LIKE, RECEIVE_LIKES } from '../actions/like_actions';

const likesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_LIKE: 
            return merge(state, action.like)
        case RECEIVE_LIKES: 
            return merge(state, likes)
        default:
            return state;
    }
}

export default likesReducer;