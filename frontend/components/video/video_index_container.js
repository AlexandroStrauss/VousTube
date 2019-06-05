import React from 'react';
import { connect } from 'react-redux';
import VideoIndex from './video_index';
import { allVideos } from '../../actions/video_actions';

const mapStateToProps = state => {
    // debugger
    return {
        videos: Object.values(state.entities.videos),
        authors: (state.entities.users)
    }
}

const mapDispatchToProps = dispatch => ({
    fetchVideos: () => dispatch(allVideos())
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);