import React from 'react';
import * as likeFunctions from '../../util/like_functions';

class VideoLikeInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldLike: null,
            likes: null,
        }

        this.likeVideo = this.likeVideo.bind(this);
        this.dislikeVideo = this.dislikeVideo.bind(this);
        this.likeSplitter = this.likeSplitter.bind(this);
        this.setOldLike = this.setOldLike.bind(this);
        this.refreshLikeValues = this.refreshLikeValues.bind(this);
    }

    componentDidMount() {
        this.props.fetchLikes("Video", this.props.video.id).then(response =>
            this.setState({ likes: response.likes })).then(this.setOldLike)
    }

    refreshLikeValues() {
        this.props.fetchLikes("Video", this.props.video.id).then(response =>
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

    likeVideo(e) {
        e.preventDefault;
        const like = ({ value: 1, likeable_type: "Video", likeable_id: this.props.video.id })

        this.likeSplitter(like);
    }

    dislikeVideo(e) {
        e.preventDefault;
        const like = ({ value: -1, likeable_type: "Video", likeable_id: this.props.video.id, user_id: this.props.currentUser.id })
        this.likeSplitter(like);
    }

    likeSplitter(newLike) {
        const oldLike = this.state.oldLike;

        if (oldLike && newLike.value === oldLike.value) {
            if (oldLike.id) {
                this.props.deleteLike(oldLike).then(delete(this.state.likes[oldLike.id])).then(this.setState({ oldLike: null }))
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
        return(
            <div className="like-bar-flex">

                <div className="likes-dislikes">
                    <button id={(this.state.oldLike && this.state.oldLike.value === 1) ? "vid-like-selected" : "vid-like"} onClick={this.likeVideo}>
                        <i className="material-icons">thumb_up</i>
                        <div id="like-counter">
                            {likeFunctions.videoLikeValue(this.state.likes).upvotes}
                        </div>
                    </button>

                    <button id={(this.state.oldLike && this.state.oldLike.value === -1) ? "vid-dislike-selected" : "vid-dislike"} onClick={this.dislikeVideo}>
                        <i className="material-icons">thumb_down</i>
                        <div id="dislike-counter">
                            {likeFunctions.videoLikeValue(this.state.likes).downvotes}
                        </div>

                    </button>
                </div>
                <div className="sentiment-bar">
                    <div className={this.state.oldLike ? "like-bar-liked" : "like-bar"} style={{ width: (likeFunctions.videoLikeValue(this.state.likes).totalLikes === 0 ? "50%" : ((likeFunctions.videoLikeValue(this.state.likes).upvotes / likeFunctions.videoLikeValue(this.state.likes).totalLikes) * 100) + "%") }}>

                    </div>
                </div>
            </div>

        )

    }
}

export default VideoLikeInterface;