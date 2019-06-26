import { connect } from 'react-redux';
import { createComment } from "../../actions/video_actions";
import CommentAndReplies from './comment_and_replies';


const mapStateToProps = (state, ownProps) => {
    const comment = state.entities.comments[ownProps.id]
    const comments = Object.values(state.entities.comments)

    const replies = comments.filter(comment => {
        comment.parent_comment_id != null && comment.parent_comment_id === ownProps.id
    })

    return {
        comment: comment,
        replies,
        users: state.entities.users,
        currentUser: state.entities.users[state.session.id],


    }
}

const mapDispatchToProps = dispatch => ({
    createComment: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentAndReplies);