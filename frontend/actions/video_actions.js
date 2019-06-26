import * as APIUtil from '../util/video_api_util';

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const RECEIVE_ALL_VIDEOS = 'RECEIVE_ALL_VIDEOS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const create = newVideo => dispatch => APIUtil.createVideo(newVideo)
    .then(video => (dispatch(receiveVideo(video))
    ), err => dispatch(receiveErrors(err.responseJSON)));

export const fetch = videoId => dispatch => APIUtil.fetchVideo(videoId)
    .then(payload => (dispatch(receiveVideo(payload))
    ), err => dispatch(receiveErrors(err.responseJSON)));

export const allVideos = () => dispatch => APIUtil.fetchVideos()
    .then(payload => (dispatch(receiveAllVideos(payload)))
    , err => dispatch(receiveErrors(err.responseJSON)));

export const createComment = comment => dispatch => {
    return(
    APIUtil.createComment(comment).then(comment => (
        dispatch(receiveComment(comment))
    ))
    )
    }

const receiveVideo = ({video, comments, author}) => {
    var commentsThemselves, commentAuthors;
    if (comments) {
        commentsThemselves = comments.comments;
        commentAuthors = comments.authors;
    } else {
        commentsThemselves = [];
        commentAuthors = [];
    }
    return {
        type: RECEIVE_VIDEO,
        video,
        comments: commentsThemselves,
        commentAuthors: commentAuthors,
        author
    }
}

const receiveAllVideos = ({videos, authors}) => ({
    type: RECEIVE_ALL_VIDEOS,
    videos,
    authors
})

const receiveComment = ({comment, author}) => {
    return {
    type: RECEIVE_COMMENT,
    comment,
    // author: comment.author,
}};

const receiveErrors = errors => {
    return {
    type: RECEIVE_ERRORS, 
    errors
    }
}
