import React from 'react';
import { connect } from 'react-redux';
import VideoPlayer from './video_player';
import { receiveVideo, fetch } from '../../actions/video_actions';
import {withRouter } from 'react-router-dom';
import { createLike, updateLike, deleteLike, fetchLikes } from '../../actions/like_actions';
const mapStateToProps = (state, ownProps) => {
    return {
    video: state.entities.videos[ownProps.match.params.id],
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id],
    // likes: Object.values(state.entities.likes).filter(like => {
    //     (like.likeable_type === Video && like.likeable_id === ownProps.match.params.id)
    // })
    // author: state.entities.users[state.entities.videos[ownProps.match.params.id].author_id]
}
}

const mapDispatchToProps = dispatch => ({
    fetchVideo: id => dispatch(fetch(id)),
    fetchLikes: (type, id) => dispatch(fetchLikes(type,id)),
    createLike: like => dispatch(createLike(like)),
    updateLike: id => dispatch(updateLike(id)),
    deleteLike: id => dispatch(deleteLike(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoPlayer));