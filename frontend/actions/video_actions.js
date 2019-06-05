import * as APIUtil from '../util/video_api_util';

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const RECEIVE_ALL_VIDEOS = 'RECEIVE_ALL_VIDEOS';
// export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const create = newVideo => dispatch => APIUtil.createVideo(newVideo)
    .then(video => (dispatch(receiveVideo(video))
    ), err => dispatch(receiveErrors(err.responseJSON)));

export const fetch = videoId => dispatch => APIUtil.fetchVideo(videoId)
    .then(payload => (dispatch(receiveVideo(payload))
    ), err => dispatch(receiveErrors(err.responseJSON)));

export const allVideos = () => dispatch => APIUtil.fetchVideos()
    .then(payload => (dispatch(receiveAllVideos(payload)))
    , err => dispatch(receiveErrors(err.responseJSON)));

const receiveVideo = ({video, author}) => {
    return {
        type: RECEIVE_VIDEO,
        video,
        author
    }
}

const receiveAllVideos = ({videos, authors}) => ({
    type: RECEIVE_ALL_VIDEOS,
    videos,
    authors
})

// const receiveErrors = errors => ({
//     type: RECEIVE_ERRORS, 
//     errors
// })
