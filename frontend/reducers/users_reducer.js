import {merge} from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_VIDEO, RECEIVE_ALL_VIDEOS } from '../actions/video_actions';
import { RECEIVE_LIKES, RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, state, {[action.user.id]: action.user});
        case RECEIVE_VIDEO:
            const nouvelleEtat = {}
            Object.values(action.commentAuthors).forEach(author => {
                nouvelleEtat[author.id] = author;
            })

            return merge({}, state, nouvelleEtat, {[action.author.id]: action.author });
        case RECEIVE_ALL_VIDEOS: 
            const newState = {};
            Object.values(action.authors).forEach(author => {
                newState[author.id] = author;
            })
            return merge({}, state, newState);
        case RECEIVE_LIKE: 
            const user = state[action.like.user_id]
            user.liked_objects.push(action.like)
            return merge({}, state, { [user.id]: user });

            // return merge({}, state, { [action.like.id]: action.like })

        case REMOVE_LIKE: 
            return merge({}, state)


        // case RECEIVE_LIKES: 
        //     const novoEstado = {} 
        //     Object.values(action.likes).forEach(like => {
        //         novoEstado[like.id] = like;
        //     })

        //     return merge({}, state, novoEstado);


        default: 
            return state;
    }
}