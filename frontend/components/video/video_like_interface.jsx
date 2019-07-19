import React from 'react';
import * as likeFunctions from '../../util/like_functions';

class VideoLikeInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldLike: null,
            likes: null,
            displayDislikePopup: false,
            displayLikePopup: false,
        }

        this.likeVideo = this.likeVideo.bind(this);
        this.dislikeVideo = this.dislikeVideo.bind(this);
        this.likeSplitter = this.likeSplitter.bind(this);
        this.setOldLike = this.setOldLike.bind(this);
        this.refreshLikeValues = this.refreshLikeValues.bind(this);
        this.hidePopups = this.hidePopups.bind(this);
        this.goToSignIn = this.goToSignIn.bind(this);
    }

    componentDidMount() {
        this.props.fetchLikes("Video", this.props.video.id).then(response =>
            this.setState({ likes: response.likes })).then(this.setOldLike)
    }

    componentDidUpdate() {

    }

    refreshLikeValues() {
        this.props.fetchLikes("Video", this.props.video.id).then(response =>
            this.setState({ likes: response.likes })).then(this.setOldLike)
    }

    goToSignIn(e) {
        e.preventDefault();
        this.props.history.push('/login')
    }

    setOldLike() {
        if (this.props.currentUser) {
            const currentUser = this.props.currentUser
            var likedObjects = {}
            currentUser.liked_objects.forEach(like => {
                likedObjects[like.id] = true
            })

            const likes = this.state.likes ? this.state.likes : {}
            var oldLike = Object.values(likes).filter(like =>
                (like.user_id === currentUser.id && likedObjects[like.id] && like.likeable_type === "Video")
            )

            this.setState({ oldLike: oldLike[0] })
        }
    }

    likeVideo(e) {
        e.preventDefault;
        if (this.props.currentUser) {
            const like = ({ value: 1, likeable_type: "Video", likeable_id: this.props.video.id })

            this.likeSplitter(like);
        } else {
            this.setState({ displayDislikePopup: false, displayLikePopup: !this.state.displayLikePopup })
            (document.getElementById('like-sign-in-popup').focus())
        }
    }

    dislikeVideo(e) {
        e.preventDefault;
        if (this.props.currentUser) {
            const like = ({ value: -1, likeable_type: "Video", likeable_id: this.props.video.id, user_id: this.props.currentUser.id })
            this.likeSplitter(like);
        } else {
            this.setState({ displayDislikePopup: !this.state.displayDislikePopup, displayLikePopup: false})
            (document.getElementById('disike-sign-in-popup').focus())

        }
    }

    hidePopups(e) {
        debugger
        // e.preventDefault();
        this.setState({ displayDislikePopup: false, displayLikePopup: false })        
    }

    displayLikeSignInPopup() {
        return (
            <div id="like-sign-in-popup">
                <div id="you-like">
                    Like this video?
                </div>

                <div id="so-sign-in">
                    Sign in to make your opinion count.
                </div>

                <button id="redirect-to-sign-in">
                    SIGN IN
                </button>
            </div>
        )
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
                    <button id={(this.state.oldLike && this.state.oldLike.value === 1) ? "vid-like-selected" : "vid-like"} onClick={this.likeVideo} >
                        <i className="material-icons">thumb_up</i>
                        <div id="like-counter">
                            {likeFunctions.videoLikeValue(this.state.likes).upvotes}
                        </div>
                    </button>

                    <div id={this.state.displayLikePopup ? "like-sign-in-popup" : "sign-in-popup-hidden"} onBlur={this.hidePopups}>
                        <div id="you-like">
                            Like this video?
                        </div>

                        <div id="so-sign-in">
                            Sign in to make your opinion count.
                        </div>

                        <div id="redirect-to-sign-in">
                            <button onClick={this.goToSignIn}>
                                SIGN IN
                            </button>
                        </div>

                    </div>


                    <button id={(this.state.oldLike && this.state.oldLike.value === -1) ? "vid-dislike-selected" : "vid-dislike"} onClick={this.dislikeVideo}>
                        <i className="material-icons">thumb_down</i>
                        <div id="dislike-counter">
                            {likeFunctions.videoLikeValue(this.state.likes).downvotes}
                        </div>

                    </button>

                    <div id={this.state.displayDislikePopup ? "dislike-sign-in-popup" : "sign-in-popup-hidden"} onBlur={this.hidePopups}>
                        <div id="you-like">
                            Don't like this video?
                        </div>

                        <div id="so-sign-in">
                            Sign in to make your opinion count.
                        </div>

                        <div id="redirect-to-sign-in">
                            <button onClick={this.goToSignIn}>
                                SIGN IN
                            </button>
                        </div>
                    </div>


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