import * as APIUtil from "../util/like_api_util";

export const RECEIVE_LIKES = "RECEIVE_LIKES";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

export const receiveLikes = likes => {
    return {
    type: RECEIVE_LIKES,
    likes
} }

export const receiveLike = like => ({
    type: RECEIVE_LIKE,
    like
    // likeable_type,
    // likeable_id, 
    // value,
    // user_id
})

export const removeLike = () => ({
    type: REMOVE_LIKE,
})

export const createLike = like => dispatch => {
    debugger
    return(
    APIUtil.createLike(like).then(like => dispatch(receiveLike(like)))
    )
}

export const updateLike = like => dispatch => (
    APIUtil.updateLike(like).then(like => dispatch(receiveLike(like)))
)

export const deleteLike = like => dispatch => (
    APIUtil.deleteLike(like).then(() => dispatch(removeLike()))
)

export const fetchLikes = (type, id) => dispatch => (
    APIUtil.fetchLikes(type, id).then(likes => dispatch(receiveLikes(likes)))
)