import React from 'react';
import { connect } from 'react-redux';
import VideoIndex from './video_index';

const mapStateToProps = state => ({
    videos: state.entities.videos,
})

const mapDispatchToProps = dispatch => ({
    fetchVideos: id => dispatch(allVideos(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);