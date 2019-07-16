import React from 'react';
import * as likeFunctions from '../../util/like_functions';

class CommentLikeInterface extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            oldLike: null,
            likes: null,
        }
    }

    componentDidMount() {
        this.props.fetchLikes("Comment", this.props.comment.id).then(response =>
            this.setState({ likes: response.likes })).then(this.setOldLike)
    }

    refreshLikeValues() {
        this.props.fetchLikes("Comment", this.props.comment.id).then(response =>
            this.setState({ likes: response.likes })).then(this.setOldLike)
    }

    setOldLike() {
        var currentUser = this.props.currentUser
        var likedObjects = {}
        debugger
        currentUser.liked_objects.forEach(like => {
            likedObjects[like.id] = true
        })

        const likes = this.state.likes ? this.state.likes : {}
        var oldLike = Object.values(likes).filter(like =>
            (like.user_id === currentUser.id && likedObjects[like.id])
        )

        debugger
        this.setState({ oldLike: oldLike[0] })
    }

    likeComment(e) {
        e.preventDefault;
        const like = ({ value: 1, likeable_type: "Comment", likeable_id: this.props.comment.id })

        this.likeSplitter(like);
    }

    dislikeComment(e) {
        e.preventDefault;
        const like = ({ value: -1, likeable_type: "Comment", likeable_id: this.props.comment.id })

        this.likeSplitter(like);
    }

    likeSplitter(newLike) {
        const oldLike = this.state.oldLike;

        if (oldLike && newLike.value === oldLike.value) {
            if (oldLike.id) {
                this.props.deleteLike(oldLike).then(delete (this.state.likes[oldLike.id])).then(this.setState({ oldLike: null }))
            } else {
                this.setState({ oldLike: null })
            }
        }
        else if (oldLike) {
            var updatedLike = oldLike
            updatedLike.value = -updatedLike.value

            this.props.updateLike(oldLike)
        }
        else {
            this.props.createLike(newLike).then(this.refreshLikeValues)
        }
    }

    render() {
        return (
            <div id="comment-like-interface">
                <button id="comment-like" onClick={this.likeComment}>
                    <i className="material-icons">thumb_up</i>
                    <div id="comment-like-counter">
                        {likeFunctions.commentLikeValue(this.state.likes)}
                    </div>
                </button>

                <button id="comment-dislike" onClick={this.dislikeComment}>
                    <i className="material-icons">thumb_down</i>
                </button>
            </div>
        )
    }
}

export default CommentLikeInterface