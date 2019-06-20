import { connect } from 'react-redux';
import { allVideos } from '../../actions/video_actions';
import SearchResults from './search_results';

const mapStateToProps = state => {
    return {
        videos: Object.values(state.entities.videos),
        authors: (state.entities.users)
    }
}

const mapDispatchToProps = dispatch => ({
    fetchVideos: () => dispatch(allVideos())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);