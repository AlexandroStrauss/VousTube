import CommentIndex from "./comment_index";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        currentUser: state.entities.users[state.session.id]
        // videos: Object.values(state.entities.videos),
        // authors: (state.entities.users)
    }
}

const mapDispatchToProps = dispatch => ({
    // fetchVideos: () => dispatch(allVideos())
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndex);