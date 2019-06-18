import React from 'react';
import { connect } from 'react-redux';
import { allVideos } from '../../actions/video_actions';
import SearchBar from './search_bar';

const mapStateToProps = state => {
    return {
        videos: Object.values(state.entities.videos),
        authors: (state.entities.users)
    }
}

const mapDispatchToProps = dispatch => ({
    fetchVideos: () => dispatch(allVideos())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);