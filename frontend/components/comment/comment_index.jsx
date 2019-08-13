import React from 'react';
import { merge } from 'lodash';
import CommentAndRepliesContainer from './comment_and_replies_container';
import { Route } from 'react-router-dom';

class CommentIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: "",
            topClicked: false,
        }

        this.update = this.update.bind(this);
        this.showCommentButtons = this.showCommentButtons.bind(this);
        this.redirectIfNotLoggedIn = this.redirectIfNotLoggedIn.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.commentLength = this.commentLength.bind(this);
    }

    update(field) {
        return(e) => {
            this.setState({ [field]: e.target.value })
        }
    }

    redirectIfNotLoggedIn () {
        if (!this.props.currentUser) {
            this.props.history.push('/login')
        }
    }
    
    showCommentButtons () {
        this.redirectIfNotLoggedIn();
        if(!this.state.topClicked) {
            this.setState({
                topClicked: true
            })
        }
    }

    userLogo (username) {
        if (username) {
            return(
            <div className="author-thumbnail" >
                <p>{username[0].toUpperCase()}</p>

            </div>
            )
        } else if (this.props.currentUser) {
            return (
                <div className="author-thumbnail" >
                    <p>{this.props.currentUser.username[0].toUpperCase()}</p> 
                    
                </div>

            )
        } else {
            return (
                <div className="nouser-icon">
                    <i className="material-icons">account_circle</i>
                </div>
            )
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var videoId = this.props.location.pathname.split('/');
        videoId = parseInt(videoId[videoId.length - 1])
        const body = this.state.body;
        const comment = merge({}, {body: body, video_id: videoId, parent_comment_id: null})

        this.props.createComment(comment).then(this.setState({body: ''}));
    }

    cancelComment () {
        this.setState({ body: '', topClicked: false});
    }

    commentLength () {
        var length = this.props.comments.length 
        
        var count;
        if (length === 1) {
            count = "1 Comment"
        } else {
            count = `${length} Comments`
        }
        return (
            <div className="comment-length">
                {count}
            </div>
        )
    }


    calculateRows() {
        var lines = this.state.body.split(/\r*\n/);
        return `${lines.length}`;
    }


    render () {
        const top_comments = this.props.comments.filter(comment => {
            return comment.parent_comment_id === null;
        })
        
        const comments = top_comments.map(comment => {
            var author = this.props.users[comment.author_id]

            return (
                    <CommentAndRepliesContainer 
                        id={comment.id} 
                        userLogo={this.userLogo} 
                        redirectIfNotLoggedIn={this.redirectIfNotLoggedIn}
                        commentLength={this.commentLength}
                        showCommentButtons={this.showCommentButtons}
                    />
            )
        })

        return (
            <>
            {this.commentLength()}
            <div className="top-comment-form">
                <div className="text-container">
                    {this.userLogo()}
                        <textarea
                        rows={this.calculateRows()}
                        placeholder="Add a public comment..."
                        id="top-comment-text" 
                        onClick={this.showCommentButtons} 
                        onKeyPress={null}
                        value={this.state.body}

                        onChange={this.update("body")}
                    />

                </div>
                    <div className={this.state.topClicked ? "comment-buttons" : "comment-buttons-hidden"}>
                        <button id="comment-cancel" 
                        onClick={this.cancelComment}
                        >
                            CANCEL
                        </button>

                    <input type="submit" id={this.state.body === '' ? "comment-submit" : "comment-submit-blue"}
                    onClick={this.state.body === '' ? null : this.handleSubmit} value="COMMENT"> 
                            
                        </input>
                    </div>


            </div>

            <ul className="comments">
                {comments}
            </ul>
            </>
        )
    }
}

export default CommentIndex;