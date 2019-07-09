import React from 'react';
import { connect } from 'react-redux';
import VideoPlayer from './video_player';
import { receiveVideo, fetch } from '../../actions/video_actions';
import {withRouter } from 'react-router-dom';
const mapStateToProps = (state, ownProps) => {
    return {
    video: state.entities.videos[ownProps.match.params.id],
    users: state.entities.users,
    // author: state.entities.users[state.entities.videos[ownProps.match.params.id].author_id]
}
}

const mapDispatchToProps = dispatch => ({
    fetchVideo: id => dispatch(fetch(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoPlayer));