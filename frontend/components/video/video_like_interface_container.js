import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createLike, updateLike, deleteLike, fetchLikes } from '../../actions/like_actions';
import VideoLikeInterface from './video_like_interface';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
})

const mapDispatchToProps = dispatch => ({
    fetchLikes: (type, id) => dispatch(fetchLikes(type, id)),
    createLike: like => dispatch(createLike(like)),
    updateLike: id => dispatch(updateLike(id)),
    deleteLike: id => dispatch(deleteLike(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoLikeInterface);

