import * as APIUtil from '../util/video_api_util';

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const RECEIVE_ALL_VIDEOS = 'RECEIVE_ALL_VIDEOS';

export const create = newVideo => dispatch => APIUtil.createVideo(newVideo)
    .then(video => (dispatch(receiveVideo(video))
    ), err => dispatch(receiveErrors(err.responseJSON)));

export const fetch = videoId => dispatch => APIUtil.fetchVideo(videoId)
    .then(video => (dispatch(receiveVideo(video))
    ), err => dispatch(receiveErrors(err.responseJSON)));


export const allVideos = () => dispatch => APIUtil.fetchVideos()
    .then(videos => (dispatch(receiveAllVideos(videos)))
    , err => dispatch(receiveErrors(err.responseJSON)));

const receiveVideo = video => {
    return {
        type: RECEIVE_VIDEO,
        video
    }
}

const receiveAllVideos = (videos) => ({
    type: RECEIVE_ALL_VIDEOS,
    videos
})
