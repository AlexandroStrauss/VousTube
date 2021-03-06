import React from 'react';
import { merge } from 'lodash';
import IndividualRepliesContainer from './individual_replies_container';
import CommentLikeInterfaceContainer from './comment_like_interface_container';
import { Route } from 'react-router-dom';
import videoAge from '../../util/date_parsers/video_age'


class CommentAndReplies extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            expanded: false,
            showReplyForm: false,
            topClicked: false,
            body: '',
        }

        this.update = this.update.bind(this);
        this.repliesLength = this.repliesLength.bind(this);
        this.toggleExpand = this.toggleExpand.bind(this);
        this.node = React.createRef();
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value })
        }
    }

    showReplyForm() {
        this.props.redirectIfNotLoggedIn();
        if (!this.state.showReplyForm) {
            this.setState({ showReplyForm: true, topClicked: true }, () => {
                this.node.current.focus();
            })
        }
    }

    cancelReply(e) {
        e.preventDefault();
        this.setState({ body: '', showReplyForm: false });
    }

    calculateRows() {
        var lines = this.state.body.split(/\r*\n/);
        return `${lines.length}`;
    }

    toggleExpand() {
        this.setState({expanded: !this.state.expanded})
    }

    handleSubmit(e) {
        e.preventDefault();
        var videoId = this.props.comment.video_id;
        var parentId = this.props.comment.id;
        const body = this.state.body;
        const comment = merge({}, { body: body, video_id: videoId, parent_comment_id: parentId })
        this.props.createComment(comment).then(this.setState({ body: '' }));
    }

    repliesLength() {
        var length = this.props.comment.child_comments.length

        if (length === 1) {
            return "1 Reply"
        } else {
            return `${length} Replies`
        }
    }

    userLogoSmall(username) {
        if (username) {
            return (
                <div className="author-thumbnail-small" >
                    <p>{username[0].toUpperCase()}</p>

                </div>
            )
        }
    }


    render() {
        var likedObjects = {}
        if(this.props.currentUser) {
            this.props.currentUser.liked_objects.forEach(like => {
                likedObjects[like.id] = true
            })
        }

        const comment = this.props.comment
        const author = this.props.users[comment.author_id]

        const replies = comment.child_comments.map(reply => {
            return (
                <IndividualRepliesContainer id={reply.id} likedObjects={likedObjects} />
            )
        })
        return (
        <li key={comment.id} id="comment-container">
            <div id="everything-comment">
                <div id="comment-author-logo">{this.props.userLogo(author.username)}</div>

                <div id="all-comment-text">
                    <div id="comment-author-info">
                        <div id="comment-author-username">{author.username}</div>
                        <div id="comment-date">{videoAge(comment.time_since_creation)}</div>
                    </div>
                        <div id="comment-body">{comment.body}</div>
                        
                        <div id="like-reply">
                            
                        <Route render={(props) => <CommentLikeInterfaceContainer {...props} comment={comment} />} />

                            <button id="reply" onClick={this.showReplyForm.bind(this)}>
                                REPLY
                            </button>
                        </div>

                {this.state.showReplyForm ? 
                (<div className="reply-form">
                    {this.userLogoSmall(this.props.currentUser.username)}
                    <div id="reply-input-and-buttons">
                    <div className="reply-text-container">
                        <textarea
                            rows={this.calculateRows()}
                            placeholder="Add a public comment..."
                            id="top-reply-text"
                            onKeyPress={null}
                            value={this.state.body}
                            ref={this.node}

                            onChange={this.update("body").bind(this)}
                        />
                    </div>

                    <div className={this.state.topClicked ? "reply-buttons" : "comment-buttons-hidden"}>
                        <button id="comment-cancel"
                            onClick={this.cancelReply.bind(this)}
                        >
                            CANCEL
                        </button>

                        <input type="submit" id={this.state.body === '' ? "comment-submit" : "comment-submit-blue"}
                            onClick={this.state.body === '' ? null : this.handleSubmit.bind(this)} value="REPLY">
                        </input>
                    </div>
                    </div>
                </div>) : null }
                    </div>

                </div>
                <div id="replies-container">
                    {this.props.comment.child_comments.length > 0 ?
                        <button id="expand-replies" onClick={this.toggleExpand}>
                            {this.state.expanded ?
                                <><div>Hide Replies</div> <i className="material-icons">keyboard_arrow_up</i></>
                                :
                                <><div>View {this.repliesLength()}</div> <i className="material-icons">keyboard_arrow_down</i></>
                            }
                        </button> : <> </>}

                    {this.state.expanded ?
                        <ul id="replies">
                            {replies}
                        </ul> : null
                    }
                </div>
            </li>
        )
    }
}

export default CommentAndReplies