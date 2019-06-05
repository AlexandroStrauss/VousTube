import React from 'react';
import { connect } from 'react-redux';
import VideoPlayer from './video_player';
import { receiveVideo, fetch } from '../../actions/video_actions';

const mapStateToProps = (state, ownProps) => {
    debugger
    return {
    video: state.entities.videos[ownProps.match.params.id],
    }
}

const mapDispatchToProps = dispatch => ({
    fetchVideo: id => dispatch(fetch(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);