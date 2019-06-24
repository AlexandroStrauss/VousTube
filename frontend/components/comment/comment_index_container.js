import CommentIndex from "./comment_index";
import { connect } from 'react-redux';
import { createComment } from "../../actions/video_actions";


const mapStateToProps = state => {
    return {
        currentUser: state.entities.users[state.session.id],
        // comments: state.entities.videos[].comments
        // authors: (state.entities.users)
    }
}

const mapDispatchToProps = dispatch => ({
    createComment: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndex);